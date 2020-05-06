import { readFileSync } from "fs"
import { configure } from "mobx"
import { observable, action } from 'mobx'
import UiState from './UiState'
import Settings from './Settings'
import ShellManager from '../core/ShellManager';
import DatasourceManager from '../core/DatasourceManager';
import HistoryStore from './HistoryStore'
import config from '../config'
// import PowershellRunner from '../modules/runner';
const {platform} = require('os');


configure({ enforceActions: "always" });

class RootStore {
 
    @observable menuConfig={};

    constructor() {
        this.loadMenu();
        this.historyStore = new HistoryStore({filePath: config.historyFilePath});
        this.shellManager = new ShellManager(config, this.historyStore);
        this.datasourceManager = new DatasourceManager(this.shellManager, config, this.historyStore);
        

        this.settings = new Settings(this);
        this.uiState = new UiState(this, config);
        
        
        this.platform = platform();
        this.shellManager.start();
    }

    @action.bound loadMenu(){
        let res = {}
        const data = readFileSync(config.menu.menuPath);
        if (data){
            res = JSON.parse(data.toString());
        }
        this.menuConfig = res;
    }
}


export default  new RootStore();

