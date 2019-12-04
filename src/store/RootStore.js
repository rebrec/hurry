import { configure } from "mobx"
import { observable, action } from 'mobx'
import UiState from './UiState'
import DataStore from './DataStore'
import PowershellRunner from '../modules/runner';

configure({ enforceActions: "always" });

class RootStore {
    constructor() {
        this.uiState = new UiState(this);
        this.dataStore = new DataStore(this);
        this.runners = {
            powershell: new PowershellRunner()
        }
    }
}


export default  new RootStore();

