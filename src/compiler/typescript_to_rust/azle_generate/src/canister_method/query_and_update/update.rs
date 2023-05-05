use cdk_framework::act::node::canister_method::{CanisterMethodType, UpdateMethod};

use crate::{canister_method::AnnotatedFnDecl, Error, TsAst};

impl TsAst {
    pub fn build_update_methods(
        &self,
        annotated_fn_decls: &Vec<AnnotatedFnDecl>,
    ) -> Result<Vec<UpdateMethod>, Vec<Error>> {
        let update_methods = annotated_fn_decls
            .iter()
            .filter(|fn_decl| fn_decl.is_canister_method_type(CanisterMethodType::Update))
            .map(|update_fn_decl| update_fn_decl.to_definition())
            .map(|definition| UpdateMethod { definition })
            .collect();

        Ok(update_methods)
    }
}
