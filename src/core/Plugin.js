
export default class Plugin {
    constructor(api){
        this._api = api;
    }
    
    beginLoad(){}
    
    onLoaded(){}
    
    onReady(){}
    
    onUnload(){}
} 