import Path from 'path' 
import { parseTemplate, parseTemplateArray } from './helpers/helpers';
import Fs from 'fs'

let globalObjects = {
    fs : Fs
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
            definition.init(globalObjects, config);
        }
        this.shell = shell;
        this.modulePath =  `${modulePath}${Path.sep}`;
        this.templateContext = {modulePath: this.modulePath};
        Object.assign(this.templateContext, this.config);
        this.initCommands = [];
        if (!this.config.disabled) this.initCommands = parseTemplateArray(definition.initCommands, this.templateContext);
        this.shell.registerInitCommands(this.initCommands);

        this.searchFunc = definition.searchFunc;
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
                        if (column.variableName !== null){
                            result[column.variableName] = result[column.property];
                        }
                    }
                }
            }
            return searchResults;
        });
        
    }
}
