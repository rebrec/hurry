const { platform } = require('os');
const path = require('path');

const Promise = require('promise');
const StatefulProcessCommandProxy = require("stateful-process-command-proxy");

let processCommand;
let processArgs;
switch (platform ()){
  case 'linux':
    processCommand = 'pwsh';
    processArgs = ['-Command','-'];

    break;
  case 'win32':
    processCommand = 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe'
    processArgs = ['-NoProfile', '-ExecutionPolicy bypass','-Command', '-']
    break;
  default:
    throw "This tool is only made for Linux and Win32 Platforms currently !"

}


const statefulProcessCommandProxy = new StatefulProcessCommandProxy(
{
  name: "powershell",
  max: 5,
  min: 5,
  idleTimeoutMS: 10000,

  logFunction: function(severity,origin,msg) {
    console.log('                ' + severity.toUpperCase() + " " +origin+" "+ msg);
  },

  processCommand: processCommand,
  processArgs:  processArgs,
  processRetainMaxCmdHistory : 50,

  processInvalidateOnRegex :
    {
      'any':[{regex:'.*error.*',flags:'ig'}],
      'stdout':[{regex:'.*error.*',flags:'ig'}],
      'stderr':[{regex:'.*error.*',flags:'ig'}]
    },

  processCwd : path.join('.', '.'),
  processEnvMap : null,
  processUid : null,
  processGid : null,

  initCommands: null,

  validateFunction: (processProxy) => {processProxy.isValid()},
  preDestroyCommands: null
});

function runcommand(command) {
  let result = {
    success: false,
    command: command,
    stdOut: cmdResult.stdOut,
    stdErr: cmdResult.stderr,
    dataResult: JSON.parse()
  };
  return statefulProcessCommandProxy.executeCommand(command)
    .then(function(cmdResult) {
      console.log("testEnvVar value: Stdout: " + cmdResult.stdout);
    })
    .catch(function(error) {
      console.log("testEnvVar Error: " + error);
    });
}
console.log('2');
// echo the value of our init command that was configured above
statefulProcessCommandProxy.executeCommand('Write-Host "$testInitVar"')
  .then(function(cmdResult) {
    console.log("testInitVar value: Stdout: " + cmdResult.stdout);
  }).catch(function(error) {
  console.log("testInitVar Error: " + error);
});
console.log('3');
// test that our invalidation regex above traps and destroys this process instance
statefulProcessCommandProxy.executeCommand('Write-Host "this command has an error and will be '+
  ' destroyed after check-in because it matches our invalidation regex"')
  .then(function(cmdResult) {
    console.log("error test: Stdout: " + cmdResult.stdout);
  }).catch(function(error) {
  console.log("Error: " + error);
});
console.log('4');
// set a var in the shell
statefulProcessCommandProxy.executeCommand('$MY_VARIABLE="test1";Write-Host "MY_VARIABLE WAS JUST SET ${MY_VARIABLE}"')
  .then(function(cmdResult) {
    console.log("Stdout: " + cmdResult.stdout);
  }).catch(function(error) {
  console.log("Error: " + error);
});
console.log('5');
// echo it back
statefulProcessCommandProxy.executeCommand('Write-Host "$MY_VARIABLE"')
  .then(function(cmdResult) {
    console.log("MY_VARIABLE value: Stdout: " + cmdResult.stdout);
  }).catch(function(error) {
  console.log("Error: " + error);
});

// shutdown the statefulProcessCommandProxy
// this is important and your destroy hooks will
// be called at this time.
setTimeout(function() {
  statefulProcessCommandProxy.shutdown();
},20000);
