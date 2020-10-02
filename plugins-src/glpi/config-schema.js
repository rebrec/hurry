module.exports = {
    glpi: {
        title: "Glpi",
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
            glpiApiEndpoint: {
                title: "API Endpoint",
                type: "string",
                format: "uri"
            },
            glpiAppToken: {
                title: "API App Token",
                type: "string",
            },
            glpiUserToken: {
                title: "API User Token",
                type: "string",
            },
        }
    }
}