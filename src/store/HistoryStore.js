import { observable, action } from 'mobx'

class HistoryStore {
    @observable commands = [];
    @observable searchs = [];
    

    constructor() {
    }

    @action.bound addCommand(command, context){
        this.commands.push({command: command, context: context});
    }
    @action.bound addSearch(datastore, keyword){
        this.searchs.push({datastore: datastore, keyword: keyword});
    }

}


export default HistoryStore;