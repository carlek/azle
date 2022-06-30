import { Rust } from '../../../../../types';

export function generateIcObjectFunctionRejectMessage(): Rust {
    return /* rust */ `
        fn _azle_ic_reject_message(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context,
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            Ok(ic_cdk::api::call::reject_message().azle_into_js_value(_context))
        }
    `;
}
