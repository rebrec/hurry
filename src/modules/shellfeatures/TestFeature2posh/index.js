module.exports = {
    name: "featureposh1",
    shell: "powershell",
    initCommands: [
        "Write-Host 'Little Test POSH'",
        "Write-Host 'Another command POSH'"
    ],
    preDestroyCommands: [
        "Write-Host 'Predestroy 1 POSH'",
        "Write-Host 'Last good bye POSH'"
    ]

}