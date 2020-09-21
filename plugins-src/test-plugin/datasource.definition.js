module.exports = {
    name: "test",
    caption: "test",
    shell: "powershell", 
    initCommands: [
        `. #{modulePath}scripts/init.ps1`
    ],
    columns: [  
        { columnName: 'Hostname', property: 'hostname', variableName: 'hostname' },
        { columnName: 'Username', property: 'username', variableName: 'username' },
        { columnName: 'Some Info', property: 'something', variableName: 'ipaddresses' },
    ],
    pingableProperty: 'ipaddresses',
    mainColumnProperty: 'computername',
    searchFunc: keyword => {
        return '$test.search("' + keyword + '") | ConvertTo-Json -Compress';
    },
};
