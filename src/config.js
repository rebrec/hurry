import Path from 'path';
import { existsSync, copyFileSync} from 'fs'
const defaultConfig = require('./example/config');

const homedir = require('os').homedir();

let customSettings = {};
let config = {};

config.isValid = false;

// const configPath = Path.join("/home/rebrec/projets/dev/js/hurry/src","config.js");
const defaultConfigPath = Path.join(__dirname, 'example', 'config.js');
const configPath = Path.join(homedir, '.hurry', 'config.js');
// const configPath = Path.join(__dirname,"config.js");


if (existsSync(configPath)){
    console.log('Importing custom configuration');
    customSettings = __non_webpack_require__(configPath);
} else {
    console.log('No custom configuration file found at ' + configPath);
    customSettings = defaultConfig;
}

delete customSettings.isValid;

Object.assign(config, customSettings);

// Check a few valid things before considering the config is valid
if (existsSync(config.projectRoot)){
    config.isValid = true;
}


const modulesRoot = Path.join(config.projectRoot, 'modules');
Object.assign(config, {
    shellsPath: Path.join(modulesRoot, "shells"),
    shellFeaturesPath: Path.join(modulesRoot, "shellfeatures"),
    datasourcesPath: Path.join(modulesRoot, "datasources"),
    viewsPath:  Path.join(config.projectRoot, "ui", "views"),

});

//Object.assign(config, customSettings);

export default config;
