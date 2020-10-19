import Path from 'path';
const app = require('electron').remote.app
let basepath;

const { ipcRenderer } = require("electron");
import { existsSync, writeFileSync, mkdirSync} from 'fs'

const program = ipcRenderer.sendSync('getCommandLineParameters')
console.log('Program parameters', program);

if (program.debug) { console.log('Debug Mode Enabled')}
if (program.profileDir) { console.log('Custom Profile directory to use:', program.profileDir)}
if (program.dev) { console.log('Dev Profile enabled')}

const defaultConfig = require('./example/config');
const exampleMenuData = require('./example/menuConfig.json');
const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
    basepath = path.join(app.getAppPath(), '.webpack', 'renderer') 
 } else {
    basepath = __dirname.split('node_modules')[0] + 'src';
 } 

const homedir = require('os').homedir();

let customSettings = {};
let config = {};
let newProfile = false;

config.isValid = false;

const defaultConfigPath = Path.join(__dirname, 'example', 'config.js');

let profilePath = Path.join(homedir, '.hurry');
if (program.profileDir) { 
    console.log('Custom Profile directory to use:', program.profileDir)
    profilePath = program.profileDir;
}
if (program.dev) {
     console.log('Dev Profile enabled')
     profilePath = Path.join(homedir, '.hurry-dev');
}


const examplePath = Path.join(__dirname, 'example');
 
const configPath = Path.join(profilePath, 'config.js');
const historyFilePath = Path.join(profilePath, 'history.json');
const menuPath = Path.join(profilePath, 'menuConfig.json');

// const exampleMenuPath = Path.join(examplePath, 'menuConfig.json');


// const configPath = Path.join(__dirname,"config.js");


if (existsSync(configPath)){
    console.log('Importing custom configuration');
    customSettings = __non_webpack_require__(configPath);
} else {
    newProfile = true;
    console.log('No custom configuration file found at ' + configPath);
    customSettings = defaultConfig;
}

delete customSettings.isValid;

Object.assign(config, customSettings);

config.projectRoot = basepath;

if (newProfile){
    // create an initial menu from example folder

    if (!existsSync(profilePath)){
        mkdirSync(profilePath);
    }
//    copyFileSync(examplePath, menuPath);
//    const exampleMenuData = require(exampleMenuPath)
   writeFileSync(menuPath, JSON.stringify(exampleMenuData));
   config.menu.menuPath = menuPath;

    if (isProd){
        const pluginsPath = Path.join(profilePath, "plugins")
        if (!existsSync(pluginsPath)){
            mkdirSync(pluginsPath);
        }
        Object.assign(config, { pluginsPath: pluginsPath })
    } else {
        const pluginsPath = Path.join(config.projectRoot, "..", "plugins-src")
        Object.assign(config, { pluginsPath: pluginsPath })
    }

}

    


// Check a few valid things before considering the config is valid
console.log('projectRoot exist : ', existsSync(config.projectRoot));
console.log('menuPath exist : ', existsSync(config.menu.menuPath));
if (!newProfile && existsSync(config.projectRoot) && existsSync(config.menu.menuPath)){
    config.isValid = true;
}


const modulesRoot = Path.join(config.projectRoot, 'modules');
Object.assign(config, {
    shellsPath: Path.join(modulesRoot, "shells"),
    shellFeaturesPath: Path.join(modulesRoot, "shellfeatures"),
    datasourcesPath: Path.join(modulesRoot, "datasources"),
    viewsPath:  Path.join(config.projectRoot, "ui", "views"),
    historyFilePath:  historyFilePath,
    builtinsPath: Path.join(config.projectRoot, 'builtins'),
    profilePath: profilePath
    
});

//Object.assign(config, customSettings);

export default config;
