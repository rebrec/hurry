module.exports = {
    name: "dodo-plugin",
    caption: "Dodo",
    shell: "powershell", 
    initCommands: [
        `$global:DODO_BASE_URL="http://#{dodoApiHost}" + ":" + "#{dodoApiPort}/api/script"`,
        `. #{modulePath}init.ps1`
    ],
    columns: [  
        { columnName: 'Hostname', property: 'computername', variableName: 'hostname' },
        { columnName: 'Username', property: 'username', variableName: 'username' },
        { columnName: 'Ip', property: 'ipaddresses', variableName: 'ipaddresses' },
    ],
    pingableProperty: 'ipaddresses',
    mainColumnProperty: 'computername',
    searchFunc: keyword => {
        return 'Search-Dodo ' + keyword + ' | ConvertTo-Json -Compress';
    },
};
