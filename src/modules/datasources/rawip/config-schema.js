module.exports = {
    rawip: {
        title: "Raw IP",
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