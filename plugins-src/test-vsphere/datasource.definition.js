module.exports = {
    name: "test-vsphere",
    caption: "vSphere ",
    shell: "powershell", 
    initCommands: [
        `. #{modulePath}scripts/init.ps1`
    ],
    columns: [  
        { columnName: 'VM Name', property: 'hostname', variableName: 'hostname' },
        { columnName: 'Host', property: 'host', variableName: 'host' },
        
    ],
    pingableProperty: 'ipaddress',
    mainColumnProperty: 'hostname',
    searchFunc: keyword => {
        return '$test.search("' + keyword + '") | ConvertTo-Json -Compress';
    },
};
