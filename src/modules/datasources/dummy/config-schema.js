module.exports = {
    dummy: {
        title: "Dummy (test)",
        type: "object",
        properties: {
            disabled: {
                title: "Disabled",
                type: "boolean",
                default: false
            },
            customDatasourceName: {
                title: "Custom Datasource Name",
                type: "string",
                default: ""
            },
        },
    }, 
}