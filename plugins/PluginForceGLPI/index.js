import Plugin from '../../src/core/Plugin'

export default class PluginForceGLPI extends Plugin{
    constructor(api){
        super(api);
    }


    beginLoad(){
        console.log("PluginForceGLPI load");
    }
    onReady(){
        console.log("PluginForceGLPI ready");
        const api = this._api

        const ds = api.store.datasourceManager.getDatasource('glpi');
        api.store.uiState.setDatasource(ds);
    }
} 