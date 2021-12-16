import { DatasourceDefinition, Config, Platforms } from '../../core/Datasource/Datasource.types';
import { DatasourceShell, DatasourceJS } from '../../core/Datasource/DatasourceBase'
import HostJSDatasourceDefinition from './HostJSDatasourceDefinition'
import { existsSync, readFileSync } from 'fs';


export class DatasourceJSHostFile extends DatasourceJS { 
    db: Array<object>
    constructor(config){ 
        super(HostJSDatasourceDefinition as DatasourceDefinition, config, __dirname);
        // this.db = require('./DemoJSONDatasource.data.json');
        // console.log(this.db);
        if (!existsSync(this.getVariable("hostfile"))) return false;
        
        const data = readFileSync(this.getVariable("hostfile"));
        this.db = parseHostData(data.toString());
        return true;
    }
    
    nativeSearch(kw: string){
        let res = this.db.filter(el => {
            return (el.hostname.indexOf(kw)) > -1;
        })
        res = res || []; 
        return Promise.resolve(
            {success: true, data: res}
            )
    }
}



function parseHostData(data){
    const res = [];
    data = (data || '').split('\n');
    data.forEach(function (line) {
      var hashIndex, matched, ip, hostnames;
      hashIndex = line.indexOf('#');
      if (hashIndex > -1) {
        line = line.slice(0, hashIndex);
      }
  
      matched = line.trim().split(/\s+/);
  
      if (matched.length < 2) {
        return;
      }
  
      ip = matched[0];
      hostnames = matched.slice(1);
  
      hostnames.forEach(function (hostname) {
        res.push({
          ipaddress: ip,
          hostname: hostname
        });
      });
      
    });
    return res;
}