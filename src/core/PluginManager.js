import { existsSync } from 'fs'
import { getFiles, getDirectories } from './helpers/helpers'
import { observable, action } from 'mobx';
import api from './api';
import { config } from '../config'

import Path from 'path';

const { platform } = require('os');


// const shellPath = [
//     'powershell.js'
// ];
// const moduleRoot = Path.join(__dirname, '..', 'modules');

export default class PluginManager{
    @observable _plugins = [];

    constructor(config){
        const {pluginsPath} = config;
        const pluginSuffix = '.bundle.js';
        this._pluginInfos = this._getPluginInfos(pluginsPath);
    }

    _getPluginInfos(pluginsPath){
        const pluginInfos = []
        const { builtinsPath } = config;
        for (const pluginsPath of [builtinsPath, pluginsPath]) {
            const pluginDirs = getDirectories(pluginsPath);
            for (const pluginDirPath of pluginDirs){
                console.log('scanning ', pluginDirPath);
                const pluginRoot = Path.join(pluginDirPath, 'dist')
                const pluginFullPath = Path.join(pluginRoot, 'main.bundle.js');
                if (existsSync(pluginFullPath)){
                    const pluginName = pluginRoot.split('/').splice(-2).shift()
                    const pluginInfo = {
                        pluginName: pluginName,
                        pluginPath: pluginFullPath,
                        pluginDir: pluginRoot
                    }
                    pluginInfos.push(pluginInfo);
                    console.log('Found plugin !', pluginFullPath);
                }
            }
        }
        return pluginInfos;
    }

    _init(){
        for (const info of this._pluginInfos){
            this._initPlugin(info);
        }
        this._loadPlugins()
    }

    _initPlugin(pluginContext){
        const {pluginNAme, pluginPath, pluginDir} = pluginContext
        console.log('PluginManager.loadPlugin : Processing file :', pluginPath);
        try {
            const Plugin = __non_webpack_require__(pluginPath).default;
            const plugin = new Plugin(api, pluginContext);
            this.addPlugin(plugin);
        } catch (e) {
            console.warn('Failed to load plugin', pluginPath, e);            
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