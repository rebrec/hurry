import Path from 'path';
import { existsSync} from 'fs'
const homedir = require('os').homedir();

let customSettings = {};
let config = {};

// const configPath = Path.join("/home/rebrec/projets/dev/js/hurry/src","config.js");
const configPath = Path.join(homedir, '.hurry', 'config.js');
// const configPath = Path.join(__dirname,"config.js");

console.log('dirnaSme',configPath);
if (existsSync(configPath)){
    console.log('Importing custom configuration');
    customSettings = __non_webpack_require__(configPath);
} else {
    console.log('No custom configuration file found');
}

Object.assign(config, customSettings);

const modulesRoot = Path.join(config.projectRoot, 'modules');
Object.assign(config, {
    shellsPath: Path.join(modulesRoot, "shells"),
    shellFeaturesPath: Path.join(modulesRoot, "shellfeatures"),
    datasourcesPath: Path.join(modulesRoot, "datasources"),

    defaultDataSource: "glpi"
});

Object.assign(config, customSettings);

export default config;