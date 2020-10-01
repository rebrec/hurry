const path = require('path');
const app = require('electron').remote.app
const isProd = process.env.NODE_ENV === 'production';
let basepath;
if (isProd) {
    basepath = path.join(app.getAppPath(), '.webpack', 'renderer') 
 } else {
    basepath = path.join(__dirname, '..'); // doesn't seems to work anymore.....
    basepath = __dirname.split('node_modules')[0] + 'src';
 } 
console.log('isProd : ' + isProd);
console.log('BASE PATH = ' + basepath);

module.exports = {
    projectRoot: basepath,
    menu: {
        menuPath: path.join(__dirname, "..", "modules", "menuConfig.json"),
        submenuShowOnClick: false
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