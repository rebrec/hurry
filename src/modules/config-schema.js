//https://medium.com/@sairamkrish/rapid-development-of-data-collection-platform-with-reactjs-and-json-schema-ef147f4c665

module.exports = {
    title: "Settings",
    type: "object",
    properties: {
        debug: {
            type: "object",
            title: "Debug Settings",
            properties:{
                defaultView: {
                    title: "Default view",
                    type: "string",
                    default: "Main"
                }
            }
        },        
        menu: {
            title: "Menu settings",
            type: "object",
            properties: {
                menuPath: {
                    title: "Menu Path",
                    type: "string"
                },
                submenuShowOnClick: {
                    title: "Show submenu by clicking (instead of simple mouse overing",
                    type: "boolean",
                    default: true
                }
            }
        },
        consoleMonitor: {
            title: "Console Monitor settings",
            type: "object",
            properties: {
                hideMarkers: {
                    title: "Hide markers",
                    type: "boolean",
                    default: true
                }
            }
        },
        projectRoot: {
                    title: "Project Root Directory",
            type: "string"
        },
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
                    }
                },
                jsHostsFile: {
                    title: "JS Hosts File",
                    type: "object",
                    properties: {
                        hostfile: {
                            title: "File Path",
                            type: "string",
                            default: "/path/to/hosts"
                        },
                    }
                },
                
            },
        },
        defaultDataSource: {
            title: "Default Datasource",
            type: "string",
        },
        defaultSearch: {
            title: "Default Search",
            type: "string",
            default: ""
        },
    }
}