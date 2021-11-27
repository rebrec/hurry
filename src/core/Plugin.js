class Plugin {
    constructor(api){
        this._api = api;
    }
    
    beginLoad(){}
    
    onLoaded(){}
    
    onReady(){}
    
    onUnload(){}
} 

export const Plugin = {
    configurationSchema: {}
    pluginDefinition:
    Plugin: Plugin
 
}