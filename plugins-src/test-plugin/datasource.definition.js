module.exports = {
    name: "test",
    caption: "test",
    shell: "powershell", 
    initCommands: [
        `. #{modulePath}scripts/init.ps1`
    ],
    columns: [  
        { columnName: 'Hostname', property: 'computername', variableName: 'hostname' },
        { columnName: 'Username', property: 'username', variableName: 'username' },
        { columnName: 'Ip', property: 'ipaddresses', variableName: 'ipaddresses' },
    ],
    pingableProperty: 'ipaddresses',
    mainColumnProperty: 'computername',
    searchFunc: keyword => {
        return '$dummy.search("' + keyword + '") | ConvertTo-Json -Compress';
    },
};
