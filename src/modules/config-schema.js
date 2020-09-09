import config from '../config'
import {getDirectories} from '../core/helpers/helpers'
import { existsSync } from 'fs';
import Path from 'path'

const { datasourcesPath } = config;
let datasourceConfigurationSchema = {};

function addDatasourceConfigurationSchema(path){
    const schemaPath = Path.join(path, 'config-schema.js');
    if (!existsSync(schemaPath)){
        console.warn('Missing config-schema', schemaPath);
        return;
    }
    
    console.log('addDatasourceConfigurationSchema : Processing file :', schemaPath);
    const datasourceDefinition = __non_webpack_require__(schemaPath);
    Object.assign(datasourceConfigurationSchema, datasourceDefinition);
}






const paths = getDirectories(datasourcesPath);
for (const path of paths){
    addDatasourceConfigurationSchema(path);
}
console.log("SCHEMA",datasourceConfigurationSchema )

export default {
    title: "Settings",
    type: "object",
    properties: {
        debug: {
            type: "object",
            title: "Debug Settings",
            properties:{
                defaultView: {
                    title: "Default view",
                    type: "string",
                    default: "Main"
                }
            }
        },        
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
        projectRoot: {
                    title: "Project Root Directory",
            type: "string"
        },
        datasources: {
            type: "object",
            title: "Datasources",
            properties: datasourceConfigurationSchema
        },
        defaultDataSource: {
            title: "Default Datasource",
            type: "string",
        },
        defaultSearch: {
            title: "Default Search",
            type: "string",
            default: ""
        },
    }
}