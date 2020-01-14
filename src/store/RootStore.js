import { configure } from "mobx"
import { observable, action } from 'mobx'
import UiState from './UiState'
import Settings from './Settings'
import ShellManager from '../core/ShellManager';
import DatasourceManager from '../core/DatasourceManager';
import settings from '../settings'
// import PowershellRunner from '../modules/runner';
const {platform} = require('os');


configure({ enforceActions: "always" });

class RootStore {

       
    constructor() {
        this.shellManager = new ShellManager(settings);
        this.datasourceManager = new DatasourceManager(this.shellManager, settings);

        this.settings = new Settings(this);
        this.uiState = new UiState(this);
        
        
        this.platform = platform();
        this.shellManager.start();
        
    }

}


export default  new RootStore();

