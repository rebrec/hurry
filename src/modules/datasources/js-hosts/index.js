import fs from 'fs'
const readFile = fs.promises.readFile;

function parseHostData(data){
    return [
        {hostname: 'pcta-xxx-72', ipaddress: "1.1.1.1"},
        {hostname: 'pcta-1-72', ipaddress: "1.1.1.2"},
        {hostname: 'pcta-2-72', ipaddress: "1.1.1.3"},
        {hostname: 'pcta-3-72', ipaddress: "1.1.1.4"},
        {hostname: 'pcta-4-72', ipaddress: "1.1.1.5"},
    ];
}

function searchData(data, keyword){ // COULD BE IMPROVED USING Array.filter ?
    const res = []; 
    for (let i = 0; i<data.length;i++){
        const elt = data[i];
        const {hostname, ipaddress} = elt;
        if (hostname.indexOf(keyword) > -1){
            res.push(elt);
        } else if (ipaddress.indexOf(keyword) > -1){
            res.push(elt);
        }
    }
    return res;
}

module.exports = {
    name: "js-hosts-file",
    caption: "Host (js)",
    shell: null,
    init: (config) =>{
        this.config = config;
        return readFile(config.hostfile)
        .then(data=> {
            this.data = parseHostData(data);
            return true;
        });
    },
    columns: [  
        { columnName: 'Hostname', property: 'hostname' },
        { columnName: 'IP Address', property: 'ipaddress' }
    ],
    mainColumnProperty: 'hostname',
    searchFunc: keyword => {
        return Promise.resolve()
        .then(_=>{
            return searchData(this.data, keyword);
        });
            
    }
};
