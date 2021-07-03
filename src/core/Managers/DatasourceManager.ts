import  Path from  'path'
import { getDirectories } from '../helpers/helpers'
import { DatasourceBase, DatasourceShell, DatasourceJS } from '../Datasource/DatasourceBase'
import DatasourceLegacy from '../Datasource/DatasourceLegacy'
// import * from '../Datasource/Datasource.types'
import { action, observable } from 'mobx';
import { cpus } from 'os';

const { platform } = require('os');


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
            this.addDatasourcePath(path);
        }
    }
    addDatasourcePath(path){
        console.log('DatasourceManager.addDatasource : Processing file :', path);
        const datasourceDefinition = __non_webpack_require__(path);
        return this.addDatasourceDefinition(datasourceDefinition, path);
    }

    @action.bound addDatasourceDefinition(datasourceDefinition, modulePath){
        if (datasourceDefinition.hasOwnProperty('platforms') && datasourceDefinition.platforms.indexOf(platform())<0){
            console.log('DatasourceManager.addDatasourceDefinition : Skipping incompatible Datasource', datasourceDefinition.name);
            return;
        }
        const shell = this.shellManager.getShell(datasourceDefinition.shell);
        if (!shell) { return console.log(`'DatasourceManager.addDatasourceDefinition : Skipping datasource ${datasourceDefinition.name} because shell ${datasourceDefinition.shell} is unavailable`)}
        
        const config = this.config.hasOwnProperty(datasourceDefinition.name) ? this.config[datasourceDefinition.name] : {};
        const datasource = new DatasourceLegacy(datasourceDefinition, config, shell, modulePath);
        this._datasources[datasource.getName()] = datasource;
    }

    @action.bound async addDatasource(datasourceInstance: DatasourceBase) {
        if (datasourceInstance.hasOwnProperty('platforms') && datasourceInstance.platforms.indexOf(platform())<0){
            console.log('DatasourceManager.addDatasource : Skipping incompatible Datasource', datasourceInstance.name);
            return;
        }
        if (datasourceInstance.shellName !== 'js'){
            const shell = this.shellManager.getShell(datasourceInstance.shellName);
            if (!shell) { return console.log(`'DatasourceManager.addDatasource : Skipping datasource ${datasourceInstance.name} because shell "${datasourceInstance.shellName}" is unavailable`)}
            await datasourceInstance.setShell(shell);
        }

        const config = this.config.hasOwnProperty(datasourceInstance.name) ? this.config[datasourceInstance.name] : {};
        this._datasources[datasourceInstance.name] = datasourceInstance;
        
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
        return null;
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