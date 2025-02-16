pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        thread_local! {
            // TODO all of this is for when we embrace native async functions
            // static SIMPLE_JOB_QUEUE_REF_CELL: std::cell::RefCell<boa_engine::job::SimpleJobQueue> = std::cell::RefCell::new(boa_engine::job::SimpleJobQueue::new());
            // let queue: Rc<dyn JobQueue> = Rc::new(queue);
            // let context = Context::builder().job_queue(queue).build().unwrap();
            // static BOA_CONTEXT_REF_CELL: std::cell::RefCell<boa_engine::Context<'static>> =
            // std::cell::RefCell::new(boa_engine::Context::default());
            // let job_queue: &dyn boa_engine::job::JobQueue = &boa_engine::job::SimpleJobQueue::new();
            // let job_queue: &dyn boa_engine::job::JobQueue = SIMPLE_JOB_QUEUE_REF_CELL.with(|jq| jq.borrow());
            // let job_queue: &dyn boa_engine::job::JobQueue = &SIMPLE_JOB_QUEUE_REF_CELL.with(|jq| *jq.borrow());

            static BOA_CONTEXT_REF_CELL: std::cell::RefCell<boa_engine::Context<'static>> = {
                let mut context = boa_engine::context::ContextBuilder::new()
                    .build()
                    .unwrap_or_else(|err| ic_cdk::trap(err.to_string().as_str()));

                context
                    .runtime_limits_mut()
                    .set_loop_iteration_limit(u64::MAX);

                context
                    .runtime_limits_mut()
                    .set_recursion_limit(usize::MAX);

                std::cell::RefCell::new(context)
            };
            static PROMISE_MAP_REF_CELL: std::cell::RefCell<
                std::collections::HashMap<String, boa_engine::JsValue>,
            > = std::cell::RefCell::new(std::collections::HashMap::new());
            static UUID_REF_CELL: std::cell::RefCell<String> =
                std::cell::RefCell::new("".to_string());
            static METHOD_NAME_REF_CELL: std::cell::RefCell<String> =
                std::cell::RefCell::new("".to_string());
            static MANUAL_REF_CELL: std::cell::RefCell<bool> =
                std::cell::RefCell::new(false);
        }
    }
}
