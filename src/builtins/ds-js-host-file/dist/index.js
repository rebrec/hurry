// import Plugin from 'hurry-plugin-definition'
import {Plugin} from '../../core/Plugin'
import schema from './config-schema'
import { DatasourceJSHostFile } from './DatasourceJSHostFile'
import { readdirSync, read, writeFileSync, exists, mkdirSync, readdir, rmdir, unlink } from 'fs';
const { promisify } = require('util');
const existsAsync = promisify(exists);

export default class DSJSHostFilePlugin extends Plugin{
    static pluginName = "ds-js-host-file"; 
    static maxInstances = -1; // -1 = unlimited / 0 = disabled / > 0 = limited
    
    beginLoad(api){
        api.store.datasourceManager.addDatasource(new DatasourceJSHostFile(this.config), this._pluginContext);
    }
 
    static getConfigurationSchema(){
        return schema;
    }

    async checkConfiguration() {
        const res = {
            success: false,
            failureMessage: ""
        };
        if (!this.config.hasOwnProperty('hostfile')) {
            res.failureMessage = "Missing configuration parameter 'hostfile'.";
            return res;
        }
        const fileExists = await existsAsync(this.config.hostfile);
        if (!fileExists) {
            res.failureMessage = "Hostfile " + this.config.hostfile + " doesn't exists.";
            return res;
        }
        res.success = true;
        return res;
    }
} 

