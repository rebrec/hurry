const { promises } = require("fs");

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
    // var _ref = data.replace(/#.*/g, '').split(/[\r\n]/);
    // var _hosts = [];
    // for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    //     line = _ref[_i];
    //     md = /(\d+\.\d+\.\d+\.\d+)\s+(.+)/.exec(line);
    //     if (md) {
    //         //obj[md[1]] = _.union(obj[md[1]] || [], md[2].trim().split(/\s+/));
    //         _hosts.push({
    //             'ipaddress': md[1],
    //             'hostname': md[2]
    //         });
    //     }
    // }
    // return _hosts;
}

function searchData(data, keyword){ // COULD BE IMPROVED USING Array.filter ?
    const res = []; 
    for (let i = 0; i<data.length;i++){
        const elt = data[i];
        const {hostname, ipaddress} = elt;
        if (hostname.toLowerCase().indexOf(keyword.toLowerCase()) > -1){
            res.push(elt);
        } else if (ipaddress.toLowerCase().indexOf(keyword.toLowerCase()) > -1){
            res.push(elt);
        }
    }
    return res;
}

module.exports = {
    name: "js-hosts-file",
    caption: "Host (js)",
    shell: 'js',
    init: (globalObjects, config) => {
        this.config = config;
        if (!globalObjects.fs.existsSync(config.hostfile)) return false;
        
        const data = globalObjects.fs.readFileSync(config.hostfile);
        this.data = parseHostData(data.toString());
        return true;
    },
    initCommands : [],
    columns: [  
        { columnName: 'Hostname', property: 'hostname' },
        { columnName: 'IP Address', property: 'ipaddress' }
    ],
    pingableProperty: 'ipaddress',
    mainColumnProperty: 'hostname',
    platforms: ['win32', 'linux'],
    searchFunc: keyword => {
        return function (kw) {
            return Promise.resolve()
            .then(_=>{
                return JSON.stringify(searchData(this.data, keyword));
            });
    
        }.bind(this, keyword);
            
    }
};
