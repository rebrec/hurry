module.exports = {
    searchDodo: {
        title: "Search Dodo Plugin",
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
            dodoApiHost: {
                title: "API Hostname",
                type: "string",
            },
            dodoApiPort: {
                title: "API Port",
                type: "string",
            },
        }

    },
}