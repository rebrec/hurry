import config from '../../config'
import store from '../../store/RootStore'
import {remote} from "electron"
const { dialog } = remote


class Api {
    constructor() {
        this.browserWindow = null;
        this.config = config;
        this.store = store;
        this.dialog = dialog;
        
    }

    _init(){
        this.store._init();
    }


    reloadBrowserWindow(){
        remote.getCurrentWindow().reload();
        // this.browserWindow.reload();
    }

}


export default  new Api();

