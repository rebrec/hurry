import Promise from 'bluebird';
import Path from 'path' 
import { observable, computed, action, extendObservable } from 'mobx'

class Settings {
    @observable datasources = [];

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

}


export default Settings;
