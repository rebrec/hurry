const { platform } = require('os');

let processCommand;
let processArgs;
switch (platform ()){
  case 'linux':
    processCommand = 'pwsh';
    processArgs = ['-Command','-'];

    break;
  case 'win32':
    processCommand = 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe'
    processArgs = ['-NoProfile -ExecutionPolicy bypass']//,'-Command', '-']//['-NoProfile', '-ExecutionPolicy bypass','-Command', '-']
    break;
  default:
    throw "This tool is only made for Linux and Win32 Platforms !"
}

module.exports = {
    name: "powershell",
    platform: ['win32', 'linux'],
    processCommand: processCommand,
    processArgs:  processArgs,
}
