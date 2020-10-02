module.exports = {
    name: "dummy-datasource",
    caption: "Dummy datasource",
    shell: "powershell",
    initCommands: [". #{modulePath}init.ps1"],
    columns: [  
        { columnName: 'Hostname', property: 'hostname' },
        { columnName: 'Username', property: 'username' },
        { columnName: 'Something', property: 'something' },
    ],
    mainColumnProperty: 'hostname',
    pingableProperty: 'hostname',
    searchFunc: keyword => {
        return '$dummy.search("' + keyword + '") | ConvertTo-Json -Compress';
    },
};
