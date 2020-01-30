//https://medium.com/@sairamkrish/rapid-development-of-data-collection-platform-with-reactjs-and-json-schema-ef147f4c665

module.exports = {
    title: "Settings",
    type: "object",
    properties: {
        datasources: {
            type: "object",
            title: "Datasources",
            properties: {
                glpi: {
                    title: "Glpi",
                    type: "object",
                    properties: {
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
                    },
                    jsHostsFile: {
                        title: "JS Hosts File",
                        type: "object",
                        properties: {
                            hostfile: {
                                title: "File Path",
                                type: "string",
                            },
                        }
                    },
                }
            },
        },
        defaultDataSource: {
            title: "Default Datasource",
            type: "string",
        },
        defaultSearch: {
            title: "Default Search",
            type: "string",
        },
    }
}