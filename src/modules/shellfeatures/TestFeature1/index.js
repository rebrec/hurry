module.exports = {
    name: "shellFeature1",
    shell: "cmd",
    initCommands: [
        "echo Little Test",
        "echo Another command"
    ],
    preDestroyCommands: [
        "echo Predestroy 1",
        "echo Last good bye"
    ]

}