
import { configure } from "mobx"
import { observable, action } from 'mobx'
import UiState from './UiState'
import Settings from './Settings'
import ContextMenuManager from '../core/ContextMenuManager';
import ShellManager from '../core/ShellManager';
import PluginManager from '../core/PluginManager';
import DatasourceManager from '../core/DatasourceManager';
import HistoryStore from './HistoryStore'
import config from '../config'
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

    _init() {
        this.shellManager.start();
        this.pluginManager._init();

    }

}


export default new RootStore();

