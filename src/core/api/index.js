import config from '../../config'
import {remote} from "electron"



class Api {
    constructor() {
        this.browserWindow = null;
    }

    reloadBrowserWindow(){
        remote.getCurrentWindow().reload();
        // this.browserWindow.reload();
    }

}


export default  new Api();

