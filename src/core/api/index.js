import { config } from '../../config'
import store from '../../store/RootStore'
import MenuManager from '../../core/MenuManager'
import {remote, clipboard} from "electron"
import Logger from '../helpers/logging';
const logger = Logger('Api');
const { dialog } = remote

class Api {
    constructor() {
        this.config = config;
        this.store = store;
        this.electron = {
            remote: remote,
            clipboard: clipboard
        }
        this.helpers = {
            Logger: Logger
        }
        this.remote = remote;
        this.menu = new MenuManager(this);
        this.version = require('../../../package.json').version;
    }

    async _init(){
        await this.store.init();
        await this.store.start();
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

