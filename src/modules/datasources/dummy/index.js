module.exports = {
    name: "dummy",
    caption: "Dummy",
    shell: "powershell",
    initCommands: [". #{modulePath}init.ps1"],
    columns: [  
        { columnName: 'Hostname', property: 'hostname' },
        { columnName: 'Username', property: 'username' },
        { columnName: 'Something', property: 'something' },
    ],
    searchFunc: keyword => {
        return '$dummy.search("' + keyword + '") | ConvertTo-Json -Compress';
    },
};
