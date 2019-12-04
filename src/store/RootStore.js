import { observable, autorun, configure } from "mobx"

configure({ enforceActions: "always" });

class RootStore {
    constructor() {
        this.uiState = new UiState(this)
        this.dataStore = new DataStore(this)
    }
}


export default RootStore;