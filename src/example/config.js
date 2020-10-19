const path = require('path');

module.exports = {
    menu: {
        menuPath: path.join(__dirname, "..", "modules", "menuConfig.json"),
        submenuShowOnClick: true
    },
    datasources: {
        glpi: {
            glpiApiEndpoint: "http://hostname/apirest.php",
            glpiAppToken: "<APP_TOKEN>",
            glpiUserToken: "<USER_TOKEN>"
        },
        jsHostsFile: {
            hostfile: '/some/path'
        }
    },
    defaultDataSource: "dummy",
    defaultSearch: "",
    debug: {
        defaultView: 'Main'
    }
}