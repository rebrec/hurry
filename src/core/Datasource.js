import Path from 'path' 
const { parseTemplate, parseTemplateArray } = require('./helpers');

export default class Datasource {
    constructor(settings, shell, modulePath){
        const { moduleRoot } = settings;
        this.name = settings.name;
        this.caption = settings.caption;
        this.columns = settings.columns;
        this.shell = shell;
        this.modulePath =  `${modulePath}${Path.sep}`;
        this.templateContext = {modulePath: this.modulePath};
        
        this.initCommands = parseTemplateArray(settings.initCommands, this.templateContext);
        this.shell.registerInitCommands(this.initCommands);

        this.searchFunc = settings.searchFunc;
    }
    search(keyword){
        return this.shell.run(this.searchFunc(keyword), {}, 'json')        
    }
}
