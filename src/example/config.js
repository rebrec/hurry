const path = require('path');
const app = require('electron').remote.app
const isProd = process.env.NODE_ENV === 'production';
const basepath = isProd ? path.join(app.getAppPath(), '.webpack', 'renderer') : path.join(__dirname, '..');
console.log('isProd : ' + isProd);
console.log('BASE PATH = ' + basepath);

module.exports = {
    projectRoot: basepath,
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