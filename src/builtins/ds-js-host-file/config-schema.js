module.exports = {
    "js-hosts-file": {
        title: "JS Hosts File",
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
            hostfile: {
                title: "File Path",
                type: "string",
                default: "/path/to/hosts"
            },
        }
    },
}