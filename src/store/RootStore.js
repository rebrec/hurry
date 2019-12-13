import { configure } from "mobx"
import { observable, action } from 'mobx'
import UiState from './UiState'
import Settings from './Settings'
import DataStore from './DataStore'
import PowershellRunner from '../modules/runner';
const {platform} = require('os');


configure({ enforceActions: "always" });

class RootStore {
    @observable runners = {
        powershell: null
    };
       
    constructor() {
        this.setupRunner();
        this.settings = new Settings(this);
        this.uiState = new UiState(this);
        this.dataStore = new DataStore(this);
        
        this.platform = platform();
    }


    @action setupRunner(){
        this.runners.powershell = new PowershellRunner();
    }
}


export default  new RootStore();

