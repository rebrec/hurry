import  Path from  'path'
import  Shell from './Shell';
import { getDirectories } from './helpers'
import Datasource from './Datasource'
import { observable } from 'mobx';
import { cpus } from 'os';



// const shellPath = [
//     'powershell.js'
// ];
// const moduleRoot = Path.join(__dirname, '..', 'modules');

export default class DatasourceManager{
    @observable _datasources = {};

    constructor(shellManager, config, historyStore){
        const { datasourcesPath, defaultDataSource } = config;
        const datasourcesPaths = getDirectories(datasourcesPath);
        this.config = config.datasources || {};
        this.shellManager = shellManager;
        this.historyStore = historyStore;
        
        this._defaultDataSource = defaultDataSource;
        for (const path of datasourcesPaths){
            this.addDatasource(path);
            
        }
    }

    addDatasource(path){
        console.log('Processing file :', path);
        const datasourceDefinition = __non_webpack_require__(path);
        const shell = this.shellManager.getShell(datasourceDefinition.shell);
        if (!shell) { return console.log(`Skipping datasource ${datasourceDefinition.name} because shell ${datasourceDefinition.shell} is unavailable`)}
        const config = this.config.hasOwnProperty(datasourceDefinition.name) ? this.config[datasourceDefinition.name] : {};
        const datasource = new Datasource(datasourceDefinition, config, shell, path);
        this._datasources[datasource.name] = datasource;
    }

    getDefaultDatasource(){
        return this.getDatasource(this._defaultDataSource)
    }

    getDatasource(name){
        return this._datasources[name];
    }
    getDatasources(){
        return this._datasources;
    }
}