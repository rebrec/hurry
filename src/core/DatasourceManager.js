import  Path from  'path'
import  Shell from './Shell';
import { getDirectories } from './helpers'
import Datasource from './Datasource'
import { observable } from 'mobx';



// const shellPath = [
//     'powershell.js'
// ];
// const moduleRoot = Path.join(__dirname, '..', 'modules');

export default class DatasourceManager{
    @observable _datasources = {};

    constructor(shellManager, settings, historyStore){
        const { datasourcesPath, defaultDataSource } = settings;
        const datasourcesPaths = getDirectories(datasourcesPath);

        this.shellManager = shellManager;
        this.historyStore = historyStore;
        
        this._defaultDataSource = defaultDataSource;
        for (const path of datasourcesPaths){
            this.addDatasource(path);
            
        }
    }

    addDatasource(path){
        console.log('Processing file :', path);
        const config = __non_webpack_require__(path);
        const shell = this.shellManager.getShell(config.shell);
        if (!shell) { return console.log(`Skipping datasource ${config.name} because shell ${config.shell} is unavailable`)}
        const datasource = new Datasource(config, shell, path);
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