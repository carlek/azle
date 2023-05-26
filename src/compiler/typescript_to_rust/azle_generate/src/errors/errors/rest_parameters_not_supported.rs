use swc_ecma_ast::{RestPat, TsFnParam, TsFnType};

use crate::{
    canister_method::AnnotatedFnDecl,
    errors::{CompilerOutput, Location, Suggestion},
    traits::GetSourceFileInfo,
    ts_ast::SourceMapped,
};

use super::GetDestructureRange;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct RestParametersNotSupported {
    message: String,
}

impl RestParametersNotSupported {
    pub fn from_ts_fn_param(_: &TsFnParam) -> Self {
        Self {
            message: "Rest parameters are not supported at this time".to_string(),
        }
    }

    pub fn from_annotated_fn_decl(annotated_fn_decl: &AnnotatedFnDecl, rest_pat: &RestPat) -> Self {
        Self {
            message: annotated_fn_decl
                .build_rest_param_error_msg(rest_pat)
                .to_string(),
        }
    }

    pub fn from_ts_fn_type(_: &SourceMapped<TsFnType>) -> Self {
        Self {
            message: "Rest parameters are not supported at this time".to_string(),
        }
    }
}

impl std::error::Error for RestParametersNotSupported {}

impl From<RestParametersNotSupported> for crate::Error {
    fn from(error: RestParametersNotSupported) -> Self {
        Self::RestParametersNotSupported(error)
    }
}

impl std::fmt::Display for RestParametersNotSupported {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.message)
    }
}

impl AnnotatedFnDecl<'_> {
    pub(super) fn build_rest_param_error_msg(&self, rest_pat: &RestPat) -> CompilerOutput {
        let range = rest_pat.get_destructure_range(self.source_map);
        let replacement_name = "myParam".to_string(); // TODO: Come up with a better name from the ts_type_ann

        CompilerOutput {
            title: "Rest parameters are not supported in canister method signatures".to_string(),
            location: Location {
                origin: self.source_map.get_origin(rest_pat.span),
                line_number: self.source_map.get_line_number(rest_pat.span),
                source: self.source_map.get_source(rest_pat.span),
                range,
            },
            annotation: "Attempted parameter spread here".to_string(),
            suggestion: Some(Suggestion {
                title: "Specify each parameter individually with a concrete type".to_string(),
                source: self.source_map.generate_source_with_range_replaced(
                    rest_pat.span,
                    range,
                    &replacement_name,
                ),
                range: (range.0, range.0 + replacement_name.len()),
                annotation: None,
                import_suggestion: None,
            }),
        }
    }
}
