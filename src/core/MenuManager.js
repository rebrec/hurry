const { observable, action } = require('mobx');
const { ipcRenderer, shell } = require("electron");

export default class MenuManager{
    constructor(api){
        this._api = api;
        this._remote = api.remote;
        
        this._menu = null;
        
        this.initMenu();
        this.show();
    }

    initMenu(){
        const { Menu, MenuItem } = this._remote;

        this._menu = Menu.buildFromTemplate([
            {
                label: '&File',
                    submenu: [
                    {label: '&Settings', click: () => { this._api.store.uiState.setCurrentView('Configuration') }},
                    {label: '&Quit', click() { ipcRenderer.send('close-app') }},
                ]
            },
            {label: '&Reload', click: () => { this._api.reloadBrowserWindow() }},
            {
                label: '&Help',
                    submenu: [
                    {label: '&Project Webpage', click: () => { shell.openExternal('https://github.com/rebrec/hurry/') }},
                    {label: '&Releases', click: () => { shell.openExternal('https://github.com/rebrec/hurry/releases') }},
                    {label: '&Issues', click: () => { shell.openExternal('https://github.com/rebrec/hurry/issues') }},
                    {label: '&Discuss', click: () => { shell.openExternal('https://discord.com/channels/755777801608757280/755777802044702781') }},
                    {label: '&About', click: () => { this._api.store.uiState.setCurrentView('About') }},
                ]
            },
          ])
        
        Menu.setApplicationMenu(this._menu);

    }

    show(){
        this._remote.Menu.setApplicationMenu(this._menu);
    }

    hide(){
        this._remote.Menu.setApplicationMenu(null);
    }
}
