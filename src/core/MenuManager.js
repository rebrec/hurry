const { observable, action } = require('mobx');
const { ipcRenderer, shell } = require("electron");
import Logger from './helpers/logging';
const logger = Logger('MenuManager');

export default class MenuManager{
    constructor(api){
        this._api = api;
        this._remote = api.remote;
        
        this._menu = null;
        this._menuTemplate = [
            {
                label: '&File',
                    submenu: [
                    {label: '&Settings', click: () => { this._api.store.uiState.setCurrentView('Configuration') }},
                    {label: '&Quit', click() { ipcRenderer.send('close-app') }},
                ]
            },
            {label: '&Reload', click: () => { this._api.reloadBrowserWindow() }},
            {label: '&Plugins', submenu: [
                {label: '&Main View', click: () => { this._api.store.uiState.setCurrentView('Main') }},
            ]},
            {
                label: '&Help',
                    submenu: [
                    {label: '&Project Webpage', click: () => { shell.openExternal('https://github.com/rebrec/hurry/') }},
                    {label: '&Releases', click: () => { shell.openExternal('https://github.com/rebrec/hurry/releases') }},
                    {label: '&Issues', click: () => { shell.openExternal('https://github.com/rebrec/hurry/issues') }},
                    {label: '&Discuss', click: () => { shell.openExternal('https://discord.com/channels/755777801608757280/755777802044702781') }},
                ]
            },
          ];
        this.initMenu();
        this.show();
    }

    _findLabelPosition(menu, labelName){
        for (let i=0; i<menu.length; i++){
            const elt = menu[i];
            if (elt.label.replace('&', '') === labelName){
                return i
            }
        }
        return -1;
    }

    initMenu(){
        const { Menu, MenuItem } = this._remote;
        this._menu = Menu.buildFromTemplate(this._menuTemplate)
        Menu.setApplicationMenu(this._menu);
    }

    insertMenuItem(location, submenuTemplate, position={}){
        const submenu = this._getSubmenu(location);
        if (!submenu) return
        let index = submenu.length;
        if (position.hasOwnProperty('after')){ index = this._findLabelPosition(submenu, position.after) + 1 }
        if (position.hasOwnProperty('before')){ index = this._findLabelPosition(submenu, position.before) }
        submenu.splice(index, 0, submenuTemplate)
        this.initMenu();
        
    }
    _getSubmenu(label){
        for (const elt of this._menuTemplate){
            if (elt.label.replace('&','') === label){
                return elt.submenu;
            }
        }
        return null;
    }

    show(){
        this._remote.Menu.setApplicationMenu(this._menu);
    }

    hide(){
        this._remote.Menu.setApplicationMenu(null);
    }
}
