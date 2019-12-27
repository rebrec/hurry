const { platform } = require('os');
const StatefulProcessCommandProxy = require("stateful-process-command-proxy");
const Promise = require('promise');
const path = require('path');

const defaultConfig = {
    min: 3,
    max: 3,
    idleTimeoutMS: 10000,    
    processCommand: null,
    processArgs:  null,
    processInvalidateOnRegex : {
      'any':[{regex:'.*error.*',flags:'ig'}],
      'stdout':[{regex:'.*error.*',flags:'ig'}],
      'stderr':[{regex:'.*error.*',flags:'ig'}]
    },
    processRetainMaxCmdHistory : 50,
    processCwd : path.join('.', '.'),
    processEnvMap : null,
    processUid : null,
    processGid : null,
    validateFunction: (processProxy) => {processProxy.isValid()},
    initCommands: null,
    preDestroyCommands: null
};

export default class Shell{
    constructor(config){
      this.name = config.name;
      const {initCommands, preDestroyCommands} = config;
      this.initCommands = [];
      this.preDestroyCommands = [];
      this.registerInitCommands(initCommands);
      this.registerPreDestroyCommands(preDestroyCommands);
      this.config = {};
      Object.assign(this.config, defaultConfig, config);
      this.runner = null;
    }

    start(){
      this.config.initCommands = this.initCommands;
      this.config.preDestroyCommands = this.preDestroyCommands;
      this.config.logFunction = (severity,origin,msg) => {
        console.log(this.name + '                ' + severity.toUpperCase() + " " +origin+" "+ msg);
      };

      this.runner = new StatefulProcessCommandProxy(this.config);
    }

    addFeature(feature){
      const { name, shell, initCommands, preDestroyCommands } = feature;
      if (this.name !== shell) { throw `Error trying to add feature ${name} shell mismatch (${this.name} != ${shell})`}
      this.registerInitCommands(initCommands);
      this.registerPreDestroyCommands(preDestroyCommands);
    }

    registerInitCommands(commands = []){
      Array.prototype.push.apply(this.initCommands, commands);
    }
    registerPreDestroyCommands(commands = []){
      Array.prototype.push.apply(this.preDestroyCommands, commands);
    }
    runcommand(command) {
        let result = {
          success: false,
          command: command,
          stdOut: cmdResult.stdOut,
          stdErr: cmdResult.stderr,
          dataResult: JSON.parse()
        };
        return this.runner.executeCommand(command)
          .then(function(cmdResult) {
            console.log("testEnvVar value: Stdout: " + cmdResult.stdout);
          })
          .catch(function(error) {
            console.log("testEnvVar Error: " + error);
          });
      }
}
    
    