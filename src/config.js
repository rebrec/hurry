import Path from 'path';
import { existsSync, writeFileSync, mkdirSync} from 'fs'
const app = require('electron').remote.app
import schemaManager from './core/ConfigurationSchema'

import Logger from './core/helpers/logging';
const logger = Logger('Config');
const { ipcRenderer } = require("electron");
const program = ipcRenderer.sendSync('getCommandLineParameters')

let basepath;


logger.silly('Program parameters', program);

if (program.debug) { logger.info('Debug Mode Enabled')}
if (program.profileDir) { logger.verbose('Custom Profile directory to use:', program.profileDir)}
if (program.dev) { logger.info('Dev Profile enabled')}

const defaultConfig = require('./example/config');
const exampleMenuData = require('./example/menuConfig.json');
const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
    basepath = Path.join(app.getAppPath(), '.webpack', 'renderer') 
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
    logger.verbose('Custom Profile directory to use:', program.profileDir)
    profilePath = program.profileDir;
}
if (program.dev) {
    logger.verbose('Dev Profile enabled')
     profilePath = Path.join(homedir, '.hurry-dev');
}


const examplePath = Path.join(__dirname, 'example');
 
const configPath = Path.join(profilePath, 'config.js');
const historyFilePath = Path.join(profilePath, 'history.json');
const menuPath = Path.join(profilePath, 'menuConfig.json');

// const exampleMenuPath = Path.join(examplePath, 'menuConfig.json');


// const configPath = Path.join(__dirname,"config.js");


if (existsSync(configPath)){
    logger.verbose('Importing custom configuration');
    customSettings = __non_webpack_require__(configPath);
} else {
    newProfile = true;
    logger.verbose('No custom configuration file found at ' + configPath);
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
logger.verbose('projectRoot exist : ', existsSync(config.projectRoot));
logger.verbose('menuPath exist : ', existsSync(config.menu.menuPath));
if (!newProfile && existsSync(config.projectRoot) && existsSync(config.menu.menuPath)){
    config.isValid = true;
}

// creating default values

if (!config.hasOwnProperty('plugins')){
    config.plugins = {};
}

const modulesRoot = Path.join(config.projectRoot, 'modules');

// Temporary backward compat 

Object.assign(config, {
    shellsPath: Path.join(modulesRoot, "shells"),
    shellFeaturesPath: Path.join(modulesRoot, "shellfeatures"),
    datasourcesPath: Path.join(modulesRoot, "datasources"),
    viewsPath:  Path.join(config.projectRoot, "ui", "views"),
    historyFilePath:  historyFilePath,
    builtinsPath: Path.join(config.projectRoot, 'builtins'),
    profilePath: profilePath,
    instances: config.instances || [],
    
});

class PluginInstancesConfigurationManager {
    constructor(instances){
        this._instances = instances;
    }

    getPluginNames(){
        return Object.keys(this._instances);
    }

    addPlugin(pluginName, maxInstances){ // <===== -1 = unlimited / 0 = disabled / > 0 = limited
        const l = logger.child({funcName:"addPlugin"});
        l.silly('start');
        const pluginSettings = this.getPluginInstancesSettings(pluginName);
        l.silly('getting plugin instance settings', pluginSettings);
        pluginSettings.max = maxInstances;
        if (maxInstances >= 0){
            pluginSettings.count = Math.min(pluginSettings.count, maxInstances)
        }
        l.silly('final instance settings', pluginSettings);
        
        this._instances[pluginName] = pluginSettings;
        l.silly('end');
    }
    getPluginInstancesSettings(pluginName) {
        return this._instances[pluginName] || {count: 1, max: 1}
    }

    getPluginInstanceCount(pluginName){
        return this.getPluginInstancesSettings(pluginName).count
    }

    getPluginInstanceMax(pluginName){
        return this.getPluginInstancesSettings(pluginName).max
    }
}

class ConfigurationManager{
    constructor(config){
        this._globalSchema = config;
        this.instancesManager = new PluginInstancesConfigurationManager(config.instances);
        this.schemaManager = schemaManager;
        Object.assign(this, config)
    }
    saveGlobalConfiguration(){throw "Not implemented yet"}
    saveGlobalConfigurationAs(){throw "Not implemented yet"}
    loadGlobalConfiguration(){throw "Not implemented yet"}

    getGlobalConfig(){ return this._globalSchema }
    getPluginConfig(instanceName){ return this._globalSchema.plugins[instanceName]}
    
    _setGlobalConfig(config){throw "Not implemented yet"}
    setPluginInstanceConfig(instanceName, config) { this._globalSchema.plugins[instanceName] = config}

    getGlobalConfigurationSchema(){throw "Not implemented yet"}
    getPluginConfigurationSchema(pluginName){throw "Not implemented yet"}

    setGlobalConfigurationSchema(schema){throw "Not implemented yet"}
    setPluginConfigurationSchema(pluginName, schema){throw "Not implemented yet"}

}


// const configurationManager = {
//     _globalSchema: config,
//     instancesManager: new PluginInstancesConfigurationManager(config.instances),
//     schemaManager: schemaManager,
//     saveGlobalConfiguration: ()=>{throw "Not implemented yet"},
//     saveGlobalConfigurationAs: ()=>{throw "Not implemented yet"},

//     loadGlobalConfiguration: ()=>{throw "Not implemented yet"},
//     getGlobalConfig: ()=> { return this._globalSchema },
//     getPluginConfig: (instanceName) => { return this._globalSchema.plugins[instanceName]},
    
//     _setGlobalConfig: (config)=>{throw "Not implemented yet"},
//     setPluginInstanceConfig: (instanceName, config) => { this._globalSchema.plugins[instanceName] = config},

//     getGlobalConfigurationSchema: ()=>{throw "Not implemented yet"},
//     getPluginConfigurationSchema: (pluginName)=>{throw "Not implemented yet"},

//     setGlobalConfigurationSchema: (schema)=>{throw "Not implemented yet"},
//     setPluginConfigurationSchema: (pluginName, schema)=>{throw "Not implemented yet"},

//     getThis: () => { return this},
// }
const configurationManager = new ConfigurationManager(config);

// Object.assign(configurationManager, config)

//Object.assign(config, customSettings);

export { configurationManager as config};
