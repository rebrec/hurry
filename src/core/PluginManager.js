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
    @observable _plugins = [];
    _pluginInfos = [];

    constructor(config){
        const { pluginsPath } = config;
        this._config = config;
        const pluginSuffix = '.bundle.js';   
    }
    
    async _scanDirectory(path){
        const pluginInfos = []
        const pluginDirs = await getDirectoriesAsync(path);
        for (const pluginDirPath of pluginDirs){
            logger.verbose('scanning ' + pluginDirPath);
            const pluginRoot = Path.join(pluginDirPath, 'dist')
            const pluginFullPath = Path.join(pluginRoot, 'main.bundle.js');
            if (await existsAsync(pluginFullPath)){
                const pluginName = pluginRoot.split('/').splice(-2).shift()
                const pluginInfo = {
                    pluginName: pluginName,
                    pluginPath: pluginFullPath,
                    pluginDir: pluginRoot
                }
                this._pluginInfos.push(pluginInfo);
                logger.verbose('Found plugin ' + pluginFullPath);
            }
        }
    }

    async init(){
        await Promise.all([this._scanDirectory(this._config.builtinsPath), this._scanDirectory(pluginsPath)]);
        
        for (const info of this._pluginInfos){
            this._initPlugin(info);
        }
        this._loadPlugins()
    }

    _initPlugin(pluginContext){
        const {pluginNAme, pluginPath, pluginDir} = pluginContext
        logger.verbose('loadPlugin : Processing file: ', pluginPath);
        try {
            const Plugin = __non_webpack_require__(pluginPath).default;
            const plugin = new Plugin(api, pluginContext);
            this.addPlugin(plugin);
        } catch (e) {
            logger.warn('Failed to load plugin ' + pluginPath, e);            
        }
    }

    _loadPlugins(){
        for (const plugin of this._plugins){
            plugin.beginLoad();
        }
        for (const plugin of this._plugins){
            plugin.onLoaded();
        }
        for (const plugin of this._plugins){
            plugin.onReady();
        }


    }

    @action.bound addPlugin(plugin){
        this._plugins.push(plugin);
    }

    @action.bound removePlugin(plugin){
        const index = this._plugins.indexOf(plugin);
        if (index > -1) {
            this._plugins.splice(index, 1);
        }
        plugin.onUnload();
    }

}