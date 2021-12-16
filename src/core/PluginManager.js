import { existsSync } from 'fs'
import { getFiles, getDirectories, getDirectoriesAsync, existsAsync } from './helpers/helpers'
import { observable, action } from 'mobx';
import api from './api';
import { config } from '../config'
import Path from 'path';
import Logger from './helpers/logging';
const logger = Logger('PluginManager');


const { platform } = require('os');


// const shellPath = [
//     'powershell.js'
// ];
// const moduleRoot = Path.join(__dirname, '..', 'modules');

export default class PluginManager{
    @observable _pluginDefinitions = [];
    _pluginInstanceDefinitions = [];
    _pluginInfos = [];

    constructor(config){
        
        this._config = config;
        const pluginSuffix = '.bundle.js';   
    }
    
    async _scanDirectory(path){
        logger.silly(`_scanDirectory(${path}) start`);
        const l = logger.child({funcName: '_scanDirectory'});
        const pluginInfos = []
        l.silly(`await getDirectoriesAsync`);
        const pluginDirs = await getDirectoriesAsync(path);
        l.silly(`pluginDirs=`, pluginDirs);
        for (const pluginDirPath of pluginDirs){
            l.verbose('scanning ' + pluginDirPath);
            const pluginRoot = Path.join(pluginDirPath, 'dist')
            const pluginFullPath = Path.join(pluginRoot, 'main.bundle.js');
            l.silly(`checking existance of ${pluginFullPath}`);
            const exist = await existsAsync(pluginFullPath);
            l.silly(`   ==> existance of ${pluginFullPath} : ${exist}`);
            if (exist){
                const pluginName = pluginRoot.split('/').splice(-2).shift()
                const pluginInfo = {
                    pluginName: pluginName,
                    pluginPath: pluginFullPath,
                    pluginDir: pluginRoot
                }
                l.silly('saving pluginInfo', pluginInfo);
                this._pluginInfos.push(pluginInfo);
                l.verbose('Found plugin ' + pluginFullPath);
            }
        }
        logger.silly(`_scanDirectory(${path}) end`);
    }

    async init(){
        logger.verbose('init() start');
        const { pluginsPath } = config;
        const promises = [];
        promises.push(this._scanDirectory(this._config.builtinsPath));
        promises.push(this._scanDirectory(pluginsPath));
        await Promise.all(promises);
        
        for (const info of this._pluginInfos){
            this._initPlugin(info);
        }
        await this._createInstances();
        await this._validateInstances();
        logger.verbose('init() end');
    }

    async start(){
        logger.verbose('start() start');
        await this._loadInstances()
        logger.verbose('start() end');
    }


    _validatePlugin(pluginClass){
        const l = logger.child({funcName: "_validatePlugin"});
        l.silly(`start`, pluginClass);
        const props = [ 'pluginName', 'maxInstances' ]
        for (const prop of props) {
            if (!pluginClass.hasOwnProperty(prop)) { 
                l.silly('property ' + prop + ' not found!')
                return false 
            }
        }
        if (pluginClass.PLUGIN_VERSION !== 2) {
            l.silly(`Plugin is not compatible with this version of Hurry (found ${pluginClass.PLUGIN_VERSION} instead of 2)`);
            return false;
        }
        return true;
    }

    _initPlugin(pluginContext){
        const l = logger.child({funcName: "_initPlugin"});
        l.silly(`start`, pluginContext);
        const {pluginName, pluginPath, pluginDir} = pluginContext
        l.verbose('Processing file: ', pluginPath);
        try {
            const PluginClass = __non_webpack_require__(pluginPath).default;
            if (!this._validatePlugin(PluginClass)) { 
                l.warn('Failed to load plugin ' + pluginPath + ' : validatePlugin Failed')
                return false
            }
            config.instancesManager.addPlugin(PluginClass.name, PluginClass.maxInstances);
            // const plugin = new Plugin(api, pluginContext);
            this._addPluginDefinition(PluginClass, pluginContext);
        } catch (e) {
            l.warn('Failed to load plugin ' + pluginPath, e);            
        }
        l.silly(`end`);
        
    }

    async _createInstances(){
        const l = logger.child({funcName: "_createInstances"});
        l.silly(`start`);
        for (const pluginDefinition of this._pluginDefinitions){
            const { pluginName } = pluginDefinition.class;
            const PluginClass = pluginDefinition.class;
            const {pluginContext} = pluginDefinition;
            const instancesCount = config.instancesManager.getPluginInstanceCount(pluginName)
            logger.verbose(`Creating ${instancesCount} instances for plugin ${pluginName}`)
            for (let i=0;i<instancesCount;i++){
                const instanceName = `${pluginName}_${i}`;
                config.schemaManager.addPluginConfigurationSchema(instanceName, PluginClass.getConfigurationSchema());
                const pluginConfig = config.getPluginConfig(instanceName);
                const pluginInstanceDefinition = { 
                    pluginName: pluginName,
                    instanceId: instanceName,
                    instance: new PluginClass(pluginContext, pluginConfig) 
                };

                this._pluginInstanceDefinitions.push(pluginInstanceDefinition)
            }
        }
        l.silly(`end`);
    }

    _getValidPluginInstanceDefinitions(){
        return this._pluginInstanceDefinitions.filter(elt => elt.instance.isValid);
    }

    async _validateInstances(){
        logger.debug(`_validateInstances() start`);
        const promises = [];
        for (const pluginInstanceDefinition of this._pluginInstanceDefinitions){
            const { pluginName, instanceId, instance } = pluginInstanceDefinition;
            const promise = instance.checkConfiguration()
                .then( (validationResult) =>{
                    if (validationResult.success === false){
                        api.store.uiState.displayToast(
                            "Error",
                            "Plugin configuration error",
                            `Failed to validate configuration of instance ${instanceId} of plugin ${pluginName} : ${validationResult.failureMessage}`
                        );
                    }
                    instance.isValid = validationResult.success;
                });
            promises.push(promise);
        }
        await Promise.all(promises);
        logger.debug(`_validateInstances() end`);
    }


    _loadInstances(){
        const l = logger.child({funcName: "_loadInstances"});
        l.silly(`start`);
        const instanceDefinitions = this._getValidPluginInstanceDefinitions();

        for (const instanceDefinition of instanceDefinitions){
            l.silly(`calling 'beginLoad' on instance ${instanceDefinition.instanceId}`);
            instanceDefinition.instance.beginLoad(api);
        }
        for (const instanceDefinition of instanceDefinitions){
            l.silly(`calling 'onLoaded' on instance ${instanceDefinition.instanceId}`);
            instanceDefinition.instance.onLoaded(api);
        }
        for (const instanceDefinition of instanceDefinitions){
            l.silly(`calling 'onReady' on instance ${instanceDefinition.instanceId}`);
            instanceDefinition.instance.onReady(api);
        }

    }

    @action.bound _addPluginDefinition(pluginClass, pluginContext){
        const l = logger.child({funcName: "_addPluginDefinition"});
        l.silly('start');
        l.silly('pluginClass=', pluginClass);
        l.silly('pluginContext=', pluginContext);
        this._pluginDefinitions.push({
            class: pluginClass,
            context: pluginContext,
        });
        l.silly('end');
    }

    @action.bound removePlugin(plugin){
        const index = this._pluginDefinitions.indexOf(plugin);
        if (index > -1) {
            this._pluginDefinitions.splice(index, 1);
        }
        plugin.onUnload();
    }

}