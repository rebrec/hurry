import config from '../../config'
import {remote} from "electron"
const { dialog } = remote


class Api {
    constructor() {
        this.browserWindow = null;
        this.dialog = dialog;
    }

    reloadBrowserWindow(){
        remote.getCurrentWindow().reload();
        // this.browserWindow.reload();
    }

}


export default  new Api();

