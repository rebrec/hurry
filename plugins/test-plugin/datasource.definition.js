module.exports = {
    name: "test",
    caption: "test",
    shell: "powershell", 
    initCommands: [
        `$global:DODO_BASE_URL="http://#{dodoApiHost}" + ":" + "#{dodoApiPort}/api/script"`,
        `. $(Join-Path -Path '#{modulePath}' -ChildPath 'scripts/init1.ps1')`
    ],
    columns: [  
        { columnName: 'Column1', property: 'hostname', variableName: 'hostname' },
        { columnName: 'Column2', property: 'username', variableName: 'username' },
        { columnName: 'Column3', property: 'something'},
    ],
    pingableProperty: 'ipaddresses',
    mainColumnProperty: 'computername',
    searchFunc: keyword => {
        return 'Search-Test ' + keyword + ' | ConvertTo-Json -Compress';
    },
};
