module.exports = {
    "name": "DemoDatasourceShellDefinition",
    "caption": "DemoDatasourceShellDefinition",
    "shellName": "powershell",
    "initCommands" : [
        // 'Start-Transcript -LiteralPath /tmp/logpwsh',
        '. #{modulePath}demoshellinit.ps1',
        `function search_#{instanceId}{param($kw);return searchInstance -instance "#{instanceId}" -keyword $kw}`,
        `$demoAPIKey_#{instanceId}="#{demoApiKey}"`,
        `$demoAPIHost_#{instanceId}="#{demoApiHost}"`,
        `$demoAPIPort_#{instanceId}="#{demoApiPort}"`,

    ],
    "platforms": ['win32', 'linux'],
    "columns": [  
        { "columnName": "column1", "property": "hostname" },
        { "columnName": "column2", "property": "ipaddress" }
    ],
    "mainColumnProperty": "column1"
    }