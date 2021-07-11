import  Path from  'path'
import { getDirectories } from '../helpers/helpers'
import { DatasourceBase, DatasourceShell, DatasourceJS, LegacyDatasourceJS, LegacyDatasourceShell } from '../Datasource/DatasourceBase'
import { LegacyDatasourceDefinition } from '../Datasource/Datasource.types'
import { ShellManager } from './ShellManager'
// import * from '../Datasource/Datasource.types'
import { action, observable } from 'mobx';
import { cpus } from 'os';
import HistoryStore from '../../store/HistoryStore'
import Logger from '../helpers/logging';
const logger = Logger('DatasourceManager');

const { platform } = require('os');

type GenericConfig = {[key: string]: any}

export class DatasourceManager{
    @observable _datasources!: {[key: string]: DatasourceBase};
    shellManager: ShellManager;
    historyStore: HistoryStore;
    config: GenericConfig;
    _defaultDataSource: string;

    constructor(shellManager: ShellManager, config: GenericConfig, historyStore: HistoryStore){
        const { datasourcesPath, defaultDataSource } = config;
        this._initDatasources();
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

    @action.bound _initDatasources(){
        this._datasources = {};
    }

    addDatasourcePath(path: string){
        logger.verbose('addDatasource : Processing file :', path);
        const datasourceDefinition = __non_webpack_require__(path);
        return this.addLegacyDatasourceDefinition(datasourceDefinition, path);
    }

    @action.bound async addDatasourceDefinition(definition: LegacyDatasourceDefinition, modulePath: string){
        return this.addLegacyDatasourceDefinition(definition, modulePath);
    }


    @action.bound async addLegacyDatasourceDefinition(definition: LegacyDatasourceDefinition, modulePath: string){
        definition.shellName = definition.shell as string;
        delete definition.shell
        if (!definition.hasOwnProperty('platforms')) { definition.platforms = ['win32', 'linux']; }
        const config = this.config.hasOwnProperty(definition.name) ? this.config[definition.name] : {};
        const datasource = (definition.shellName === 'js') ? 
            new LegacyDatasourceJS(definition, config, modulePath) : new LegacyDatasourceShell(definition, config, modulePath)
        
        return this.addDatasource(datasource);
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

    getDatasourceId(name: string){
        return this._datasources[name];
    }
    getDatasource(caption: string){
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