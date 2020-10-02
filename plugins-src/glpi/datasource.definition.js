module.exports = {
    name: "glpi",
    caption: "Glpi",
    shell: "powershell",
    initCommands: [
        `Import-Module -Name GlpiTools`,
        `Set-GlpiToolsConfig  -PathToGlpi #{glpiApiEndpoint}  -AppToken "#{glpiAppToken}"  -UserToken "#{glpiUserToken}"`,
        `. #{modulePath}init.ps1`
    ],
    columns: [  
        { columnName: 'Hostname', property: 'Nom', variableName: 'hostname' },
        { columnName: 'Username', property: 'Utilisateur', variableName: 'username' },
    ],
    pingableProperty: 'Nom',
    mainColumnProperty: 'Nom',
    searchFunc: keyword => {
        return '$glpiSearcher.search("' + keyword + '") | ConvertTo-Json -Compress';
    },
};
