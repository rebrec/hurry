const { platform } = require('os');
const { parseTemplate } = require('./helpers');
const StatefulProcessCommandProxy = require("stateful-process-command-proxy");
import { observable, computed, action, extendObservable } from 'mobx'
const Promise = require('promise');
const path = require('path');

const defaultConfig = {
    min: 2,
    max: 2,
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
    validateFunction: (processProxy) => { return processProxy.isValid()},
    initCommands: null,
    preDestroyCommands: null
};

export default class Shell{
  
  @observable runner;

  constructor(config){
    this.name = config.name;
    const {initCommands, preDestroyCommands} = config;
    this.initCommands = [];
    this.preDestroyCommands = [];
    this.registerInitCommands(initCommands);
    this.registerPreDestroyCommands(preDestroyCommands);
    this.config = {};
    Object.assign(this.config, defaultConfig, config);
  }
  
  @action.bound start(){
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
  _run(command) {
      return this.runner.executeCommand(command);
  }

  run(command, context={}, output="json") {
    output = output.toLowerCase();
    const processJSON = (output === 'json');
    command = parseTemplate(command, context);
    // switch (output){
    //   case 'json':
    //       command = `${command} | ConvertTo-Json`
    //     break;
    //   case 'none':

    //   break;
    //   default:
    //     throw `Invalid command output ${output}`
    // }
    return this._run(command)
      .then((res) => {
        let obj;
        console.log(`received res : `, res);
        // this.ps.streams
        if (processJSON){
          let res1 = {success: false, data: {}};
          try {
            obj = JSON.parse(res.stdout);
            if (obj === null) { return []; }
            if (!obj.length) { obj = [obj]; }
            res1.success = true;
          }
          catch (err){
            obj = {}
            res1.success = false;
            res1.errorMessage = err;
            res1.res = res;
          }
          res1.data = obj;
          return res1;
        }
        return res;
      })
      .catch((err) => {
        console.error(`Runner ERROR while trying to run command ${command}`);
        console.error(err);
        if (processJSON){
          let res1 = {success: false, errorMessage: err};
          return res1;
        }
        return err;
      });
  }

}
    
    