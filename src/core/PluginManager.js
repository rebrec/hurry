import { getFiles } from './helpers/helpers'
import { observable, action } from 'mobx';
import api from './api';

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
        this._pluginFiles = getFiles(pluginsPath).filter(ent => ent.endsWith(pluginSuffix));
    }

    _init(){
        for (const path of this._pluginFiles){
            this._initPlugin(path);
        }
        this._loadPlugins()
    }

    _initPlugin(path){
        console.log('PluginManager.loadPlugin : Processing file :', path);
        try {
            const Plugin = __non_webpack_require__(path).default;
            const plugin = new Plugin(api);
            this.addPlugin(plugin);
        } catch (e) {
            console.warn('Failed to load plugin', path, e);            
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