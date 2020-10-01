import Path from 'path';
import { existsSync, writeFileSync} from 'fs'
const defaultConfig = require('./example/config');

const homedir = require('os').homedir();

let customSettings = {};
let config = {};
let noConfig = false;

config.isValid = false;
const profilePath = Path.join(homedir, '.hurry');
const examplePath = Path.join(__dirname, 'example');

const configPath = Path.join(profilePath, 'config.js');
const historyPath = Path.join(profilePath, 'history.json');
const menuPath = Path.join(profilePath, 'menuConfig.json');

const exampleMenuPath = Path.join(examplePath, 'menuConfig.json');

if (existsSync(configPath)){
    console.log('Importing custom configuration');
    customSettings = __non_webpack_require__(configPath);
} else {
    noConfig = true;
    console.log('No custom configuration file found at ' + configPath);
    customSettings = defaultConfig;
}

delete customSettings.isValid;

Object.assign(config, customSettings);

if (noConfig){
    // create an initial menu from example folder

   if (!existsSync(profilePath)){
           mkdirSync(profilePath);
   }
   const exampleMenuData = require(exampleMenuPath)
   writeFileSync(menuPath, JSON.stringify(exampleMenuData));
   config.menu.menuPath = menuPath;

}


// Check a few valid things before considering the config is valid
console.log('projectRoot exists : ', existsSync(config.projectRoot), "and is at " + config.projectRoot);
console.log('menuPath exist : ', existsSync(config.menu.menuPath));
if (existsSync(config.projectRoot) && existsSync(config.menu.menuPath)){
    config.isValid = true;
}


const modulesRoot = Path.join(config.projectRoot, 'modules');
Object.assign(config, {
    shellsPath: Path.join(modulesRoot, "shells"),
    shellFeaturesPath: Path.join(modulesRoot, "shellfeatures"),
    datasourcesPath: Path.join(modulesRoot, "datasources"),
    pluginsPath: Path.join(config.projectRoot, "..", "plugins-dist"),
    viewsPath:  Path.join(config.projectRoot, "ui", "views"),
    historyFilePath:  historyPath
});

//Object.assign(config, customSettings);

export default config;
