module.exports = {
    name: "ds-js-hosts-file",
    caption: "Host (js) (plugin)",
    shell: 'js',
    init: (globalObjects, config) => {
        this.config = config;
        if (!globalObjects.fs.existsSync(config.hostfile)) return false;
        
        const data = globalObjects.fs.readFileSync(config.hostfile);
        this.data = parseHostData(data.toString());
        return true;
    },
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
