use proc_macro2::TokenStream;

use crate::{generators::canister_methods::method_body, ts_ast::AzleFnDecl};

pub fn generate_post_upgrade_method_body(
    post_upgrade_fn_decl_option: Option<&AzleFnDecl>,
    ic_object: TokenStream,
) -> TokenStream {
    let call_to_post_upgrade_js_function =
        method_body::maybe_generate_call_to_js_function(&post_upgrade_fn_decl_option);

    let function_name = match post_upgrade_fn_decl_option {
        Some(post_upgrade_fn_decl) => post_upgrade_fn_decl.get_function_name(),
        None => "DOES_NOT_EXIST".to_string(),
    };

    quote::quote! {
        BOA_CONTEXT_REF_CELL.with(|box_context_ref_cell| {
            let mut _azle_boa_context = box_context_ref_cell.borrow_mut();

            METHOD_NAME_REF_CELL.with(|method_name_ref_cell| {
                let mut method_name_mut = method_name_ref_cell.borrow_mut();

                *method_name_mut = #function_name.to_string()
            });

            _azle_handle_boa_result(
                _azle_boa_context.eval("let exports = {};".to_string()),
                &mut _azle_boa_context
            );

            #ic_object

            _azle_boa_context.register_global_property(
                "ic",
                ic,
                boa_engine::property::Attribute::all()
            );

            _azle_handle_boa_result(_azle_boa_context.eval(format!(
                "{compiled_js}",
                compiled_js = MAIN_JS
            )), &mut _azle_boa_context);

            #call_to_post_upgrade_js_function
        });
    }
}
