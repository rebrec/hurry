module.exports = {
    name: "search-dodo",
    caption: "Dodo",
    shell: "powershell",
    initCommands: [],
    columns: [  
        { columnName: 'Hostname', property: 'computername', variableName: 'hostname' },
        { columnName: 'Username', property: 'username', variableName: 'username' },
    ],
    pingableProperty: 'computername',
    mainColumnProperty: 'computername',
    searchFunc: keyword => {
        return 'Search-Dodo ' + keyword + ' | ConvertTo-Json -Compress';
    },
};
