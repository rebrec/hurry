import { config } from '../../config'
import store from '../../store/RootStore'
import MenuManager from '../../core/MenuManager'
import {remote} from "electron"
const { dialog } = remote


class Api {
    constructor() {
        this.config = config;
        this.store = store;
        this.remote = remote;
        this.menu = new MenuManager(this);
        this.version = require('../../../package.json').version;
    }

    _init(){
        this.store._init();
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

