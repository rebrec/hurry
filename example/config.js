module.exports = {
    projectRoot: "/path/to/your/project/dir/containing/module/folder",
    datasources: {
        glpi: {
            glpiApiEndpoint: "http://hostname/apirest.php",
            glpiAppToken: "<APP_TOKEN>",
            glpiUserToken: "<USER_TOKEN>"
        }
    },
    defaultDataSource: "dummy",
}