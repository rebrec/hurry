import { existsSync } from 'fs'
import Path from 'path' 
import { parseTemplate, parseTemplateArray } from '../helpers/helpers';

import { DatasourceDefinition, LegacyDatasourceDefinition, LegacyDatasourceDefinitionShell, LegacyDatasourceDefinitionJS, SearchResults, Column, InitCommands, TemplateContext, TemplateContextElement, Config, Platforms } from './Datasource.types'
import { Shell, ShellOutputType } from '../Shell/Shell.types';
import { ThemeProvider } from 'react-bootstrap';
import { platform } from 'custom-electron-titlebar/lib/common/platform';
import Logger from '../helpers/logging';
const logger = Logger('DatasourceBase');
export interface DatasourceBase{
    _nativeSearch?(kw: string): Promise<SearchResults>;
    _getShellSearchString?(kw: string): string;
}

export abstract class DatasourceBase implements DatasourceDefinition {
    private _instanceId: number
    private _name!: string;
    private _caption!: string;
    private _shellName!: string;
    private _mainColumnProperty!: string;
    pingableProperty?: string;
    private _columns!: Array<Column>;
    private _initCommands: InitCommands = [];
    private _platforms: Platforms = [];
    
    private _config!: Config;
    private _shellInstance: Shell | undefined;
    
    private _templateContext: TemplateContext = {instanceId:-1, modulePath: ''};
    private _modulePath!: string;
    
    // constructor(definition, config, modulePath){
    
    constructor(definition: DatasourceDefinition, config: Config, modulePath: string){
        const mandatoryDatasourceDefinition = ['name', 'caption', 'shellName', 'mainColumnProperty', 'columns', 'initCommands', 'platforms'];
        for (const prop of mandatoryDatasourceDefinition as Array<keyof DatasourceDefinition>) {
            if (!definition[prop]) throw new Error(`Missing Property "${prop}" in datasource definition`)
        }
//DISABLED FOR NOW        
        // if (!(this instanceof DatasourceShell) && !(this instanceof DatasourceJS)) throw new Error("Datasource must be derived either from DatasourceShell or DatasourceJS classes");
        if ((this instanceof DatasourceShell) && (typeof this["_getShellSearchString"] !== "function")) throw new Error("Class must implement _getShellSearchString");
        if ((this instanceof DatasourceJS) && (typeof this["_nativeSearch"] !== "function")) throw new Error("Class must implement _nativeSearch");
        
        this.name = definition.name;
        this.caption = definition.caption;
        this.shellName = definition.shellName;
        this.mainColumnProperty = definition.mainColumnProperty;
        this.pingableProperty = definition.pingableProperty;
        this.columns = definition.columns;
        this.initCommands = definition.initCommands;
        this.platforms = definition.platforms;
        

        (this.constructor as any).counter = ((this.constructor.hasOwnProperty('counter') && (this.constructor as any).counter) || 0) + 1;
        this._instanceId = (this.constructor as any).counter;
        this.addTemplateContext('instanceId', `${this._instanceId}`);
        
                
        this.config = config;
        // if (definition.hasOwnProperty('init')){
        //     const initResult = definition.init(globalObjects, config);
        //     if (!initResult) {
        //         console.error('disabling Datasource', this.name, 'due to init problem');
        //         this.config.disabled = true;
        //     }
        // }
        
        if (!existsSync(modulePath)) throw new Error("modulePath doesn't exist");
        
        this.modulePath = `${modulePath}${modulePath.endsWith(Path.sep) ? '': Path.sep}`;
        this.addTemplateContext('modulePath', `${this.modulePath}`);

        Object.assign(this.templateContext, this.config);
        if (this.templateContext.hasOwnProperty('disabled')) { delete this.templateContext.disabled };
        if (this.config.disabled) return
        this.initCommands = parseTemplateArray(definition.initCommands, this.templateContext);
    }

    async init(): Promise<boolean>{
        return Promise.resolve(true);
    }

    private runInitChecks(): Promise<boolean> | boolean{
        return true;
    }


    get instanceId(): number { return this._instanceId; }
    

    get config(): Config { return this._config; }
    set config(config: Config) { this._config = config;}

    getName(){
        return (this.config.customDatasourceName && this.config.customDatasourceName.length > 0) ? this.config.customDatasourceName : this.caption;
    }
    
    get name(): string { return `${this._name}_${this.instanceId}`; }
    set name(name: string) { this._name = name;}

    get caption() : string { return `${this._caption}_${this.instanceId}`; }
    set caption(caption: string) { this._caption = caption; }
    
    get columns() : Array<Column> { return this._columns; }
    set columns(columnObj: Array<Column>) { this._columns = columnObj; }
    
    get mainColumnProperty() : string { return this._mainColumnProperty; }
    set mainColumnProperty(propertyName: string) { this._mainColumnProperty = propertyName; }
    
    get shell(){ return this._shellInstance; }
    async setShell(shellInstance: Shell):Promise<boolean> { 
        if (shellInstance.name !== this.shellName) throw new Error("Invalid Shell provided");
        this._shellInstance = shellInstance;
        this._shellInstance.registerInitCommands(this.initCommands);
        return await this.init();
    }
    
    get shellName(){ return this._shellName; }
    set shellName(shellName) { this._shellName = shellName; }
    
    get templateContext() : TemplateContext { return this._templateContext; }
    set templateContext(templateContext: TemplateContext) { this._templateContext = templateContext; }
    
    get modulePath() : string { return this._modulePath; }
    set modulePath(modulePath: string) { this._modulePath = modulePath; }

    addTemplateContext(variableName: string, value: string){
        const obj: TemplateContextElement = {};
        obj[variableName] = value;
        this._mergeTemplateContext(obj);
    }
    _mergeTemplateContext(context: TemplateContextElement){
        Object.assign(this._templateContext, context);
    }
    
    getVariable(variableName: string): string{
        if (this.templateContext.hasOwnProperty(variableName)) return (this.templateContext as any)[variableName];
        else return "";
    }

    get initCommands() : InitCommands { return this._initCommands; }
    set initCommands(initCommands: InitCommands) { this._initCommands = initCommands; }
    

    get platforms() : Platforms { return this._platforms; }
    set platforms(platforms: Platforms) { this._platforms = platforms; }
    
    async search(keyword: string): Promise<SearchResults>{
		if (!this._shellInstance) { throw new Error("search has been called but shell is not valid !")};
        let searchResults: SearchResults;
		if (typeof this["_nativeSearch"] == "function") { 
			searchResults = await this._nativeSearch(keyword) 
		} else if (typeof this["_getShellSearchString"] == "function"){
			searchResults = await this._shellInstance.executeAsync(this._getShellSearchString(keyword), this.templateContext, ShellOutputType.Json) 
		} else {
            throw new Error('Please implement either _nativeSearch() or _getShellSearchString()');
        }

        if (searchResults.success){
            for (const result of searchResults.data){
                result.datasource = {
                    name: this.name,
                    mainColumnProperty: this.mainColumnProperty,
                    columns: this.columns
                };
                result._pingableProperty = this.pingableProperty;
                for (const column of this.columns){
                    if (column.hasOwnProperty('variableName')){
                        result[column.variableName!] = result[column.property];
                    }
                }
            }
        }
        return searchResults;
    }
}

export abstract class DatasourceShell extends DatasourceBase{
    abstract _getShellSearchString(keyword: string): string;
}


export abstract class DatasourceJS extends DatasourceBase{
    constructor(definition: DatasourceDefinition, config: Config, modulePath: string){
        definition.shellName = 'js';
        super(definition, config, modulePath);
        this.setShell({name: 'js', registerInitCommands: ()=>{}, executeAsync: async()=>{}})
    }
    abstract _nativeSearch(keyword: string): Promise<SearchResults>;
}


export class LegacyDatasourceShell extends DatasourceBase{
    _searchFunc: (keyword: string) => string

    constructor(definition: LegacyDatasourceDefinition, config: Config, modulePath: string){
        if (!definition.hasOwnProperty('platforms')) { definition.platforms = ['win32', 'linux']}
        super(definition, config, modulePath);
        if (!definition.hasOwnProperty('searchFunc')) throw new Error('missing Shell DatasourceDefinition property : searchFunc');
        const shellDefinition = (definition as unknown) as LegacyDatasourceDefinitionShell
        this._searchFunc = shellDefinition.searchFunc;
    }
        
    _getShellSearchString(keyword: string){
        return this._searchFunc(keyword)
    }
}


export class LegacyDatasourceJS extends DatasourceBase{
    _searchFunc: (keyword: string) => Promise<SearchResults>

    constructor(definition: LegacyDatasourceDefinition, config: Config, modulePath: string){
        definition.shellName = 'js';
        if (!definition.hasOwnProperty('platforms')) { definition.platforms = ['win32', 'linux']}
        super(definition, config, modulePath);
        this.setShell({name: 'js', registerInitCommands: ()=>{}, executeAsync: async()=>{}})
        if (!definition.hasOwnProperty('searchFunc')) throw new Error('missing JS DatasourceDefinition property : searchFunc');
        const jsDefinition = (definition as unknown) as LegacyDatasourceDefinitionJS
        this._searchFunc = jsDefinition.searchFunc;
    }
    
    _nativeSearch(keyword: string){
        return this._searchFunc(keyword)
    };
}

