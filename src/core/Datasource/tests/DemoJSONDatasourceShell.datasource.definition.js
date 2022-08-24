module.exports = {
    name: "demo-json-array-datasource-shell",
    caption: "JSON Array Datasource Shell",
    shellName: "powershell",
    initCommands: [
        ". #{modulePath}DemoJSONDatasource.init.ps1",
        `$jsonFileSearcher_#{instanceId} = [JsonFileSearcher]::new("#{modulePath}DemoJSONDatasource.data.json");`
    ],
    platforms: ['win32', 'linux'],
    columns: [  
        { columnName: 'Hostname', property: 'hostname' },
        { columnName: 'Username', property: 'username' },
        { columnName: 'Whatever', property: 'something' }
    ],
    pingableProperty: 'hostname',
    mainColumnProperty: 'hostname'
};