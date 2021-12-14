
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
        // this.shellManager.start();
        await this.shellManager.init();
        await this.datasourceManager.init();
        await this.pluginManager.init();
        await this.uiState.init();
    }

    async start() {
        await this.shellManager.start();
        await this.datasourceManager.start();
        await this.pluginManager.start();
        await this.uiState.start();
    }

}


export default new RootStore();

