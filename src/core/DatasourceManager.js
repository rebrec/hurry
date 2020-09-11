import  Path from  'path'
import  Shell from './Shell';
import { getDirectories } from './helpers/helpers'
import Datasource from './Datasource'
import { observable } from 'mobx';
import { cpus } from 'os';

const { platform } = require('os');


// const shellPath = [
//     'powershell.js'
// ];
// const moduleRoot = Path.join(__dirname, '..', 'modules');

export default class DatasourceManager{
    @observable _datasources = {};

    constructor(shellManager, config, historyStore){
        const { datasourcesPath, defaultDataSource } = config;
        this.config = config.datasources || {};
        this.shellManager = shellManager;
        this.historyStore = historyStore;
        this._defaultDataSource = defaultDataSource;

        if (!config.isValid) return;
        const datasourcesPaths = getDirectories(datasourcesPath);
        
        for (const path of datasourcesPaths){
            this.addDatasource(path);
        }
    }

    addDatasource(path){
        console.log('DatasourceManager.addDatasource : Processing file :', path);
        const datasourceDefinition = __non_webpack_require__(path);
        if (datasourceDefinition.hasOwnProperty('platform') && datasourceDefinition.platform.indexOf(platform())<0){
            console.log('DatasourceManager.addDatasource : Skipping incompatible Datasource', datasourceDefinition.name);
            return;
        }
        const shell = this.shellManager.getShell(datasourceDefinition.shell);
        if (!shell) { return console.log(`'DatasourceManager.addDatasource : Skipping datasource ${datasourceDefinition.name} because shell ${datasourceDefinition.shell} is unavailable`)}
        
        const config = this.config.hasOwnProperty(datasourceDefinition.name) ? this.config[datasourceDefinition.name] : {};
        const datasource = new Datasource(datasourceDefinition, config, shell, path);
        this._datasources[datasource.name] = datasource;
    }

    getDefaultDatasource(){
        const defaultDatasource = this.getDatasource(this._defaultDataSource);
        if (!defaultDatasource) return this.getDatasourcesAvailable()[0];
        return this.getDatasource(this._defaultDataSource)
    }

    getDatasourceId(name){
        return this._datasources[name];
    }
    getDatasource(caption){
        for (const props in this._datasources){
            const datasource = this._datasources[props];
            if (datasource.getName() === caption) return datasource;
        }
        return false;
    }
    getDatasources(){
        return this._datasources;
    }

    getDatasourcesAvailable(){
        const datasources = [];
        for (const props in this._datasources){
            datasources.push(this._datasources[props]);
        }
        return datasources.filter(datasource => datasource.config.disabled !== true);
    }
}