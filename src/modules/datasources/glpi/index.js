module.exports = {
    name: "glpi",
    caption: "Glpi",
    shell: "powershell",
    initCommands: [
        "Import-Module -Name GlpiTools",
        "Set-GlpiToolsConfig  -PathToGlpi http://www.glpi.sdis72.fr/apirest.php  -AppToken v1GEFoGM1o499lrxL48QmKQQlPjatixNxTXQRn2J  -UserToken 2X9B2PURJgpmZqZioMbkiY0WpIZ181409jA1KZcl",
        ". #{modulePath}init.ps1"
    ],
    columns: [  
        { columnName: 'Hostname', property: 'hostname' },
        { columnName: 'Username', property: 'username' },
        { columnName: 'Something', property: 'something' },
    ],
    searchFunc: keyword => {
        return '$glpiSearcher.search("' + keyword + '") | ConvertTo-Json -Compress';
    },
};
