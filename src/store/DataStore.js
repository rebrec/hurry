import { observable, action } from 'mobx'

class DataStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        
    }
}


export default DataStore;