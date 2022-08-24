import cloneDeep from 'lodash/cloneDeep'
import { readFileSync } from "fs"
import Logger from './helpers/logging';
const logger = Logger('ContextMenuManager');

export default class ContextMenuManager{
    constructor(filePath){
        this._customMenu = {};
        this._pluginMenu = [];
        if (filePath) this.loadFromFile(filePath);
    }

    loadFromFile(filePath){
        let data = ""
        try {
            data = readFileSync(filePath);
        } catch (e) {
            console.error('Error reading Menu file ', filePath, e);
        }
        this.loadFromJson(data);
    }

    loadFromJson(jsonMenu){
        let menu = {};
        try {
            menu = JSON.parse(jsonMenu);
        } catch (e) {
            console.error('Error parsing JSON Menu', jsonMenu, e);
        }
        this._customMenu = menu;
    }

    exportToJson(){
        return JSON.stringify(this._customMenu);
    }

    _lockContainer(container){
        container.locked = true;
        for (const elt of container.children){
            if (elt.type === 'CONTAINER'){
                this._lockContainer(elt);
            } else {
                elt.locked = true;
            }
        }
    }

    registerPlugin(contextMenu, datasources){
        let contextMenuObj = {}
        
        if (!datasources) datasources = [];
        if (!Array.isArray(datasources)) datasources = [datasources];
        
        if (contextMenu.type !== "CONTAINER") return console.error('contextMenu type must be equal to "CONTAINER"');
        
        this._lockContainer(contextMenu)
        contextMenu.datasources = datasources;
        this._pluginMenu.push(contextMenu);
    }

    getCustomMenu(){
        return this._customMenu;
    }

    getPluginMenu(){
        return this._pluginMenu;
    }

    getMenu(){
        const customMenu = cloneDeep(this._customMenu);
        customMenu.children.push(...this._pluginMenu);
        return customMenu;       
    }

}