use proc_macro2::TokenStream;

use ts_ast::TsAst;

pub use stable_b_tree_map::{AzleStableBTreeMapNode, StableBTreeMapNode};

mod canister_method;
mod errors;
mod generators;
mod stable_b_tree_map;
mod to_act;
mod ts_ast;
mod ts_keywords;
mod utils;

pub fn generate_canister(ts_file_names: &Vec<&str>, main_js: String) -> TokenStream {
    TsAst::new(&ts_file_names, main_js)
        .to_act()
        .to_token_stream()
}
