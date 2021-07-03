import { DatasourceDefinition, Config, Platforms } from '../Datasource.types';
import DemoDatasourceShellDefinition from './DemoDatasourceShellDefinition';
import DemoDatasourceJSDefinition from './DemoDatasourceJSDefinition';
import DemoJSONDatasourceShellDatasourceDefinition from './DemoJSONDatasourceShell.datasource.definition'
import DemoJSONDatasourceJSDatasourceDefinition from './DemoJSONDatasourceJS.datasource.definition'

import { DatasourceShell, DatasourceJS } from '../DatasourceBase'

export class DemoDatasourceShell extends DatasourceShell { 
    constructor(config={disabled:false}){ super(DemoDatasourceShellDefinition as DatasourceDefinition,{disabled:false}, __dirname); }
    _getShellSearchString(kw: string){return `search_#{instanceId} -kw "${kw}" | ConvertTo-Json`}
}

export class DemoDatasourceJS extends DatasourceJS { 
    constructor(){ super(DemoDatasourceJSDefinition,{disabled:false}, __dirname); }
    
    _nativeSearch(kw: string){return Promise.resolve({success: true, data: [{column1:"Search - " + this.getVariable('instanceId'), column2: kw}]})}
}

export class DemoJsonDatasourceShell extends DatasourceShell {
    constructor(){
        super(DemoJSONDatasourceShellDatasourceDefinition as DatasourceDefinition, {disabled:false}, __dirname)
    }
    _getShellSearchString(kw: string){
        return `$jsonFileSearcher_#{instanceId}.search("${kw}") | ConvertTo-Json -Compress`;
    }
}

export class DemoJsonDatasourceJS extends DatasourceJS { 
    constructor(){ 
        super(DemoJSONDatasourceJSDatasourceDefinition as DatasourceDefinition,{disabled:false}, __dirname); 
        this.db = require('./DemoJSONDatasource.data.json');
        console.log(this.db);
    }
    
    _nativeSearch(kw: string){
        let res = this.db.filter(el => {
            return (el.hostname.indexOf(kw)) > -1;
        })
        res = res || []; 
        return Promise.resolve(
            {success: true, data: res}
            )
    }
}
