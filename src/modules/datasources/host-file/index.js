module.exports = {
    name: "host-file",
    caption: "Host",
    shell: "powershell",
    initCommands: [". #{modulePath}init.ps1"],
    // platform: ['win32', 'linux'],
    columns: [  
        { columnName: 'Hostname', property: 'hostname' },
        { columnName: 'IP Address', property: 'ipaddress' }
    ],
    mainColumnProperty: 'hostname',
    searchFunc: keyword => {
        return '$hostsFileSearcher.search("' + keyword + '") | ConvertTo-Json -Compress';
    },
};
