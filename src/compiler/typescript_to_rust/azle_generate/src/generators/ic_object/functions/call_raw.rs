use crate::generators::cross_canister_calls::{
    generate_post_await_state_management, generate_pre_await_state_management,
    generate_promise_fulfillment,
};

pub fn generate_ic_object_function_call_raw() -> proc_macro2::TokenStream {
    let pre_await_state_management = generate_pre_await_state_management();
    let post_await_state_management = generate_post_await_state_management();
    let promise_fulfillment = generate_promise_fulfillment();

    quote::quote! {
        fn _azle_ic_call_raw(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            // TODO make this promise in a better way once Boa allows it or you can figure it out
            let promise_js_value = _context.eval("new Promise(() => {})").unwrap();

            let canister_id: ic_cdk::export::Principal = _aargs.get(0).unwrap().clone().try_from_vm_value(&mut *_context).unwrap();
            let method: String = _aargs.get(1).unwrap().clone().try_from_vm_value(&mut *_context).unwrap();
            let args_raw: Vec<u8> = _aargs.get(2).unwrap().clone().try_from_vm_value(&mut *_context).unwrap();
            let payment: u64 = _aargs.get(3).unwrap().clone().try_from_vm_value(&mut *_context).unwrap();

            _azle_ic_call_raw_spawn(
                &promise_js_value,
                canister_id,
                method,
                args_raw,
                payment
            );

            Ok(promise_js_value)
        }

        fn _azle_ic_call_raw_spawn(
            promise_js_value: &boa_engine::JsValue,
            canister_id: ic_cdk::export::Principal,
            method: String,
            args_raw: Vec<u8>,
            payment: u64
        ) {
            let promise_js_value = promise_js_value.clone();

            ic_cdk::spawn(async move {
                #pre_await_state_management

                let call_result = ic_cdk::api::call::call_raw(
                    canister_id,
                    &method,
                    &args_raw,
                    payment
                ).await;

                #post_await_state_management

                #promise_fulfillment
            });
        }
    }
}
