module.exports = {
    name: "rawip",
    caption: "IP",
    shell: "powershell",
    initCommands: [],
    columns: [  
        { columnName: 'IP', property: 'hostname' },
    ],
    mainColumnProperty: 'hostname',
    pingableProperty: 'hostname',
    searchFunc: keyword => {
        return '@(@{hostname = "' + keyword + '"}) | ConvertTo-Json -Compress';
    },
};
