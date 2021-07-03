module.exports = {
    name: "demo-json-array-datasource-js",
    caption: "JSON Array Datasource JS",
    shellName: "js",
    initCommands: [
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