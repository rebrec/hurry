import { configure } from "mobx"
import { observable, action } from 'mobx'
import UiState from './UiState'
import DataStore from './DataStore'

configure({ enforceActions: "always" });

class RootStore {
    constructor() {
        this.uiState = new UiState(this);
        this.dataStore = new DataStore(this);
    }
}


export default  new RootStore();

