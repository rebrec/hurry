
import { configure } from "mobx"
import { observable, action } from 'mobx'
import UiState from './UiState'
import Settings from './Settings'
import ContextMenuManager from '../core/ContextMenuManager';
import { ShellManager } from '../core/Managers/ShellManager';
import PluginManager from '../core/PluginManager';
import { DatasourceManager } from '../core/Managers/DatasourceManager';
import HistoryStore from './HistoryStore'
import { config } from '../config'
import Logger from '../core/helpers/logging';
const logger = Logger('RootStore');
// import PowershellRunner from '../modules/runner';
const { platform } = require('os');
configure({ enforceActions: "always" });

class RootStore {
    constructor() {
        this.contextMenu = new ContextMenuManager(config.menu.menuPath);
        
        this.historyStore = new HistoryStore({ filePath: config.historyFilePath });
        this.shellManager = new ShellManager(config, this.historyStore);
        this.datasourceManager = new DatasourceManager(this.shellManager, config, this.historyStore);
        this.pluginManager = new PluginManager(config);

        this.settings = new Settings(this);
        this.uiState = new UiState(this, config);


        this.platform = platform();

    }

    
    async init() {
        const l = logger.child({funcName: "init"});
        l.silly('start');
        l.debug('shellManager init');
        await this.shellManager.init();
        l.debug('datasourceManager init');
        await this.datasourceManager.init();
        l.debug('pluginManager init');
        await this.pluginManager.init();
        l.debug('uiState init');
        await this.uiState.init();
        l.silly('end');
    }

    async start() {
        const l = logger.child({funcName: "start"});
        l.silly('start');
        l.debug('shellManager init');
        await this.shellManager.start();
        l.debug('datasourceManager init');
        await this.datasourceManager.start();
        l.debug('pluginManager init');
        await this.pluginManager.start();
        l.debug('uiState init');
        await this.uiState.start();
        l.silly('end');
    }

}


export default new RootStore();

