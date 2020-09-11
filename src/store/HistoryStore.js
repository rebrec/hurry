import { observable, action } from 'mobx'
import { readFileSync, writeFileSync, existsSync } from 'fs'

class HistoryStore {
    @observable commands = [];
    @observable searchs = [];

    constructor(options) {
        if (options) { this.filePath = options.filePath; }
        this.loadFromFile();
    }
    

    @action.bound saveToFile(){
        if (!this.filePath) return;
        const strCommands = JSON.stringify(this.commands);
        try {
            writeFileSync(this.filePath, strCommands);
        } catch {}
    }

    @action.bound loadFromFile(){
        if (!this.filePath) return;
        if (!existsSync(this.filePath)) return;
        const strCommands =  readFileSync(this.filePath);
        try {
            this.commands = JSON.parse(strCommands);
        } catch {}
    }

    @action.bound addCommand(command, context){
        let historySize = 37;
        this.commands.push({command: command, context: context});
        if (this.commands.length >= historySize) this.commands.splice(0,this.commands.length - historySize); 
        this.saveToFile();
    }
    @action.bound addSearch(datastore, keyword){
        this.searchs.push({datastore: datastore, keyword: keyword});
        this.saveToFile();
    }

}


export default HistoryStore;