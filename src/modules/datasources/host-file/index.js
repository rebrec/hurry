module.exports = {
    name: "host-file",
    caption: "Host",
    shell: "powershell",
    initCommands: [". #{modulePath}init.ps1"],
    columns: [  
        { columnName: 'Hostname', property: 'hostname' },
        { columnName: 'IP Address', property: 'ipaddress' }
    ],
    searchFunc: keyword => {
        return '$hostsFileSearcher.search("' + keyword + '") | ConvertTo-Json -Compress';
    },
};
