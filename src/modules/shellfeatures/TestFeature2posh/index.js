module.exports = {
    name: "featureposh1",
    shell: "powershell",
    initCommands: [
        "Start-Transcript -Path 'c:\\toto.txt'",
        "Write-Host 'Test ligne 1'",
        "Write-Host 'Test ligne 2'",
        "Write-Host 'Test ligne 3'",
        "Write-Host 'Test ligne 4'",
        "Write-Host 'Test ligne 5'"
    ],
    preDestroyCommands: [
        "Write-Host 'Predestroy 1 POSH'",
        "Write-Host 'Last good bye POSH'"
    ]

}