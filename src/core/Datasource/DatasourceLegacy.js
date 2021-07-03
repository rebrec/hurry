import Path from 'path' 
import { parseTemplate, parseTemplateArray } from '../helpers/helpers';
import Fs from 'fs'

let globalObjects = {
    fs : Fs,
    promise: Promise
};


export default class Datasource {
    constructor(definition, config, shell, modulePath){
        const { moduleRoot } = definition;
        this.name = definition.name;
        this.caption = definition.caption;
        this.columns = definition.columns;
        this.mainColumnProperty = definition.mainColumnProperty;
        this.pingableProperty = definition.pingableProperty;
        this.config = config;
        if (definition.hasOwnProperty('init')){
            const initResult = definition.init(globalObjects, config);
            if (!initResult) {
                console.error('disabling Datasource', this.name, 'due to init problem');
                this.config.disabled = true;
            }
        }
        this.shell = shell;
        this.modulePath =  `${modulePath}${Path.sep}`;
        this.templateContext = {modulePath: this.modulePath};
        Object.assign(this.templateContext, this.config);
        this.initCommands = [];
        if (this.config.disabled) return
        this.initCommands = parseTemplateArray(definition.initCommands, this.templateContext);
        this.shell.registerInitCommands(this.initCommands);

        this.searchFunc = definition.searchFunc;
    }

    getName(){
        return (this.config.customDatasourceName && this.config.customDatasourceName.length > 0) ? this.config.customDatasourceName : this.caption;
    }

    search(keyword){
        return this.shell.run(this.searchFunc(keyword), {}, 'json')
        .then(searchResults =>{
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
                            result[column.variableName] = result[column.property];
                        }
                    }
                }
            }
            return searchResults;
        });
        
    }
}
