const processCommand = 'bash';
const processArgs = [];

module.exports = {
    name: "bash",
    platform: ['linux'],
    processCommand: processCommand,
    processArgs:  processArgs,
    initCommands: ['echo "salut from BASH"']
}
