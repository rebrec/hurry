import config from '../config'
import api from '../core/api'
import {getDirectories} from '../core/helpers/helpers'
import { existsSync } from 'fs';
import Path from 'path'
const { datasourcesPath, pluginsPath } = config;

export default new class ConfigurationSchema{

    constructor(){
        this._schema = {} 
        this._datasourceConfigurationSchema = {};
    }
    
    _addDatasourceConfigurationSchema(path){
        const schemaPath = Path.join(path, 'config-schema.js');
        if (!existsSync(schemaPath)){
            console.warn('Missing config-schema', schemaPath);
            return; 
        } else {
            console.log('Processing config-schema', schemaPath);
        }
        
        console.log('addDatasourceConfigurationSchema : Processing file :', schemaPath);
        const datasourceDefinition = __non_webpack_require__(schemaPath);
        Object.assign(this._datasourceConfigurationSchema, datasourceDefinition);
    }

    updateDatasourceConfigurationSchema(){
        this._datasourceConfigurationSchema = {};
        let paths = getDirectories(datasourcesPath);
        paths.push(...(getDirectories(pluginsPath)));
        for (const path of paths){
            this._addDatasourceConfigurationSchema(path);
        }
        console.log("SCHEMA",this._datasourceConfigurationSchema )
    }


    getConfigurationSchema(){
        this.updateDatasourceConfigurationSchema();
        const datasourcesAvailable = api.store.datasourceManager.getDatasourcesAvailable();
        const datasourceNames = datasourcesAvailable.map(datasource => datasource.getName());
        if (datasourceNames.length === 0) datasourceNames.push("dummy");
        
        return {
            title: "Settings",
            type: "object",
            properties: {

                menu: {
                    title: "Menu settings",
                    type: "object",
                    properties: {
                        menuPath: {
                            title: "Menu Path",
                            type: "string"
                        },
                        submenuShowOnClick: {
                            title: "Show submenu by clicking (instead of simple mouse overing",
                            type: "boolean",
                            default: true
                        }
                    }
                },
                projectRoot: {
                    title: "Project Root Directory",
                    type: "string"
                },
                pluginsPath: {
                    title: "Plugin Directory",
                    type: "string"
                },
                defaultDataSource: {
                    title: "Default Datasource",
                    type: "string",
                    enum: datasourceNames
                },
                
                datasources: {
                    type: "object",
                    title: "Datasources",
                    properties: this._datasourceConfigurationSchema
                },
                defaultSearch: {
                    title: "Default Search",
                    type: "string",
                    default: ""
                },
                consoleMonitor: {
                    title: "Console Monitor settings",
                    type: "object",
                    properties: {
                        hideMarkers: {
                            title: "Hide markers",
                            type: "boolean",
                            default: true
                        }
                    }
                },                
                debug: {
                    type: "object",
                    title: "Debug Settings",
                    properties:{
                        defaultView: {
                            title: "Default view",
                            type: "string",
                            default: "Main"
                        },
                        enableDevTools: {
                            title: "Enable web console (need application restart to take effect)",
                            type: "boolean",
                            default: false
                        }
                    }
                }, 

            }
        }

    }

}




