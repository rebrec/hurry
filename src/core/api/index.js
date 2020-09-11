import config from '../../config'
import store from '../../store/RootStore'
import {remote} from "electron"
const { dialog } = remote


class Api {
    constructor() {
        this.config = config;
        this.store = store;
        this.dialog = dialog;
    }

    reloadBrowserWindow(){
        remote.getCurrentWindow().reload();
        // this.browserWindow.reload();
    }
    openDevTools(){
        remote.getCurrentWindow().webContents.openDevTools();
    }
}


export default  new Api();

