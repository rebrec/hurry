// import Plugin from 'hurry-plugin-definition'
import {Plugin} from '../../core/Plugin'
import schema from './config-schema'
import { DatasourceJSHostFile } from './DatasourceJSHostFile'

export default class DSJSHostFilePlugin extends Plugin{
    static pluginName = "ds-js-host-file"; 
    static maxInstances = -1; // -1 = unlimited / 0 = disabled / > 0 = limited
    
    beginLoad(api){
        api.store.datasourceManager.addDatasource(new DatasourceJSHostFile(this.config), this._pluginContext);
    }
 
    static getConfigurationSchema(){
        return schema;
    }
} 

