module.exports = {
    name: "glpi",
    caption: "Glpi",
    shell: "powershell",
    initCommands: [". #{modulePath}init.ps1"],
    searchFunc: keyword => {
        return '$dummy.search("' + keyword + '") | ConvertTo-Json -Compress';
    },
};
