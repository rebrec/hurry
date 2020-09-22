module.exports = {
    name: "searchDodo1",
    caption: "Dodo1",
    shell: "powershell", 
    initCommands: [
        `$global:DODO_BASE_URL="http://#{dodoApiHost}" + ":" + "#{dodoApiPort}/api/script"`,
        `. #{modulePath}init1.ps1`
    ],
    columns: [  
        { columnName: 'Hostname', property: 'computername', variableName: 'hostname' },
        { columnName: 'Username', property: 'username', variableName: 'username' },
        { columnName: 'Ip', property: 'ipaddresses', variableName: 'ipaddresses' },
    ],
    pingableProperty: 'ipaddresses',
    mainColumnProperty: 'computername',
    searchFunc: keyword => {
        return 'Search-Dodo1 ' + keyword + ' | ConvertTo-Json -Compress';
    },
};
