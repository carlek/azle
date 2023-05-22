use swc_ecma_ast::ClassProp;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct InvalidDecorator {}

impl InvalidDecorator {
    pub fn from_class_prop(class_prop: &ClassProp) -> Self {
        // Self::InvalidDecorator => "Invalid decorator. Only @query and @update are permitted.",
        Self {}
    }
}

impl From<InvalidDecorator> for crate::Error {
    fn from(error: InvalidDecorator) -> Self {
        Self::InvalidDecorator(error)
    }
}
