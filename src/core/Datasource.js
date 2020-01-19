import Path from 'path' 
const { parseTemplate, parseTemplateArray } = require('./helpers');

export default class Datasource {
    constructor(definition, config, shell, modulePath){
        const { moduleRoot } = definition;
        this.name = definition.name;
        this.caption = definition.caption;
        this.columns = definition.columns;
        this.mainColumnProperty = definition.mainColumnProperty;
        this.config = config;
        this.shell = shell;
        this.modulePath =  `${modulePath}${Path.sep}`;
        this.templateContext = {modulePath: this.modulePath};
        Object.assign(this.templateContext, this.config);
        
        this.initCommands = parseTemplateArray(definition.initCommands, this.templateContext);
        this.shell.registerInitCommands(this.initCommands);

        this.searchFunc = definition.searchFunc;
    }
    search(keyword){
        return this.shell.run(this.searchFunc(keyword), {}, 'json')
        .then(searchResults =>{
            if (searchResults.success){
                for (const result of searchResults.data){
                    result._datasource = this;
                }
            }
            return searchResults;
        });
        
    }
}
