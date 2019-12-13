import Promise from 'bluebird';
import Path from 'path' 
import { observable, computed, action, extendObservable } from 'mobx'

const dummyModuleDir = Path.join(__dirname, '..', 'modules', 'dummy', 'powershell');

class Settings {
    @observable datasources = [];

    constructor(rootStore) {
        this.rootStore = rootStore;
        this._loadDatasources();
    }

    _loadDatasources(){
        this._registerDatasource({
            name: "dummy",
            caption: "Dummy",
            runner: "powershell",
            initScript: "init.ps1",
            searchVar: "$dummy",
            moduleDir: dummyModuleDir
        });
        this._registerDatasource({
            name: "glpisearch",
            caption: "Glpi",
            runner: "powershell",
            initScript: "init.ps1",
            searchVar: "$dummy",
            moduleDir: dummyModuleDir
        });
    }
    
    @action.bound
    _registerDatasource(settings){
        const { runners } = this.rootStore;
        const ds = new Datasource(runners, settings);
        console.log('ds added', ds);
        this.datasources.push(ds);
    }
}
class Datasource {
    constructor(runners, settings){
        this.name = settings.name;
        this.caption = settings.caption;
        this.runner = runners[settings.runner];
        
        this.initCmd = Path.join(settings.moduleDir, settings.initScript);
        this.runner.run(`. ${this.initCmd}`, {}, 'none');

        this.searchVar = settings.searchVar;
    }
    search(keyword){
        return this.runner.run(`${this.searchVar}.search('${keyword}')`, {}, 'json')        
    }
}

export default Settings;
