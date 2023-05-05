use cdk_framework::act::node::{canister_method::QueryOrUpdateDefinition, CandidType, Param};

use crate::{
    canister_method::{query_and_update, AnnotatedFnDecl},
    ts_ast::SourceMapped,
};

impl<'a> AnnotatedFnDecl<'a> {
    pub fn to_definition(&self) -> QueryOrUpdateDefinition {
        let body = query_and_update::generate_body(&self);
        let is_async = self.is_promise();
        let is_manual = self.is_manual();
        let guard_function_name = self.annotation.guard.clone();
        let name = self.get_function_name();
        let params = self.build_params();
        let return_type = self.build_return_type();

        QueryOrUpdateDefinition::new(
            is_async,
            is_manual,
            guard_function_name,
            name,
            params,
            return_type,
            body,
        )
    }

    pub fn build_params(&self) -> Vec<Param> {
        let names = self.get_param_name_idents();
        let types = self.build_param_types();
        names
            .iter()
            .enumerate()
            .map(|(i, name)| Param {
                name: name.clone().to_string(),
                candid_type: types[i].clone(),
            })
            .collect()
    }

    // TODO why is this separated from get_name. It would be much simpler
    // imho to get the names and the params all in the same pass
    fn build_param_types(&self) -> Vec<CandidType> {
        self.get_param_ts_types()
            .into_iter()
            .map(|ts_type| SourceMapped::new(ts_type, self.source_map).to_candid_type())
            .collect()
    }

    fn build_return_type(&self) -> CandidType {
        SourceMapped::new(self.get_return_ts_type(), self.source_map).to_candid_type()
    }
}
