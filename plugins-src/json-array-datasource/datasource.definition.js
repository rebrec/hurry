module.exports = {
    name: "json-array-datasource",
    caption: "JSON Array Datasource",
    shell: "powershell",
    initCommands: [
        ". #{modulePath}init.ps1",
        `$jsonFileSearcher = [JsonFileSearcher]::new("#{modulePath}data.json");`
    ],
    // platform: ['win32', 'linux'],
    columns: [  
        { columnName: 'Hostname', property: 'hostname' },
        { columnName: 'Username', property: 'username' },
        { columnName: 'Whatever', property: 'something' }
    ],
    pingableProperty: 'hostname',
    mainColumnProperty: 'hostname',
    searchFunc: keyword => {
        return '$jsonFileSearcher.search("' + keyword + '") | ConvertTo-Json -Compress';
    },
};
