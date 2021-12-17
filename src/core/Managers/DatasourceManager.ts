import  Path from  'path'
import { getDirectoriesAsync } from '../helpers/helpers'
import { DatasourceBase, DatasourceShell, DatasourceJS } from '../Datasource/DatasourceBase'
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
    // _datasourcesPath: string;

    constructor(shellManager: ShellManager, config: GenericConfig, historyStore: HistoryStore){
        this._initDatasources();
        this.config = config.datasources || {};
        this._defaultDataSource = config.defaultDataSource;
        // this._datasourcesPath = config.datasourcesPath;
        
        this.shellManager = shellManager;
        this.historyStore = historyStore;
        // if (!config.isValid) return;
        
    }

    // async scanDirectories(){
    //     const l = logger.child({funcName: "scanDirectories"});
    //     l.silly('getDirectoriesAsync('+  this.config.datasourcesPath) +')';
    //     const datasourcesPaths = await getDirectoriesAsync(this._datasourcesPath);
    //     l.silly('datasourcesPaths=', datasourcesPaths);
        
    //     for (const path of datasourcesPaths){
    //         this.addDatasourcePath(path);
    //     }
    // }

    async init(){
        logger.silly('init()');
        // await this.scanDirectories();
    }

    async start(){

    }
    
    @action.bound _initDatasources(){
        this._datasources = {};
    }

    // addDatasourcePath(path: string){
    //     const l = logger.child({funcName: "addDatasourcePath"});
    //     l.verbose('Processing file :', path);
    //     const datasourceDefinition = __non_webpack_require__(path);
    //     return this.addLegacyDatasourceDefinition(datasourceDefinition, path);
    // }

    // @action.bound async addDatasourceDefinition(definition: LegacyDatasourceDefinition, modulePath: string){
    //     return this.addLegacyDatasourceDefinition(definition, modulePath);
    // }


    // @action.bound async addLegacyDatasourceDefinition(definition: LegacyDatasourceDefinition, modulePath: string){
    //     definition.shellName = definition.shell as string;
    //     delete definition.shell
    //     if (!definition.hasOwnProperty('platforms')) { definition.platforms = ['win32', 'linux']; }
    //     const config = this.config.hasOwnProperty(definition.name) ? this.config[definition.name] : {};
    //     const datasource = (definition.shellName === 'js') ? 
    //         new LegacyDatasourceJS(definition, config, modulePath) : new LegacyDatasourceShell(definition, config, modulePath)
        
    //     return this.addDatasource(datasource);
    // }

    
    @action.bound async addDatasource(datasourceInstance: DatasourceBase, extraContext: {}) {
        datasourceInstance.mergeTemplateContext(extraContext)
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
        const l = logger.child({funcName: "getDefaultDatasource"});
        l.debug('_defaultDataSource=', this._defaultDataSource);

        const defaultDatasource = this.getDatasource(this._defaultDataSource);
        l.debug('defaultDatasource=', defaultDatasource);
        if (!defaultDatasource) {
            l.debug('No default datasource found!, using default one');
            const defaultOne = this.getDatasourcesAvailable()[0];
            return defaultOne;
        }
        return defaultDatasource;
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