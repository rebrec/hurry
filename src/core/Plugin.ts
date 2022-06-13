

export type CheckConfigurationResult = {
    success: boolean;
    failureMessage: string;
};

export abstract class Plugin {
    static readonly PLUGIN_VERSION=2;
    static pluginName = ""; // cannot use name, as it is reserved
    // static multiInstances = false;
    static maxInstances = 0; // -1 = unlimited / 0 = disabled / > 0 = limited
    _pluginContext={};
    _config = {};
    isValid = false;
    get config() {
        return this._config;
    }
    set config(config) {
        this._config = config;
    }
    constructor(pluginContext={}, config={}) {
        this.config = config;
        this._pluginContext = pluginContext;
    }
    
    

    async beginLoad(api: any){}
    
    async onLoaded(api: any){}
    
    async onReady(api: any){}
    
    async onUnload(api: any){}

    static getConfigurationSchema() {
        return {};
    }

    async checkConfiguration(): Promise<CheckConfigurationResult> {
        return {
            success: true,
            failureMessage: ""
        };
    }
} 
