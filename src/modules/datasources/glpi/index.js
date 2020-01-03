module.exports = {
    name: "dummy",
    caption: "Dummy",
    shell: "powershell",
    initCommands: [". #{modulePath}init.ps1"],
    searchFunc: keyword => {
        return '$dummy.search("' + keyword + '") | ConvertTo-Json -Compress';
    },
};
