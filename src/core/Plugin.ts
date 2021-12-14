export abstract class Plugin {
    static pluginName = ""; // cannot use name, as it is reserved
    static multiInstances = false;
    static maxInstances = 0; // -1 = unlimited / 0 = disabled / > 0 = limited


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