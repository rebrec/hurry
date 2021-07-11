const { platform } = require('os');
const { parseTemplate } = require('./helpers/helpers');
const StatefulProcessCommandProxy = require("./helpers/stateful-command-proxy/statefulProcessCommandProxy");
import { observable, computed, action, extendObservable } from 'mobx'
import MonitorManager from "./MonitorManager";
const path = require('path');

const defaultConfig = {
    min: 1,
    max: 1,
    idleTimeoutMS: 2592000000,   // about 30 Days
    processCommand: null,
    processArgs:  null,
    /*processInvalidateOnRegex : {
      'any':[{regex:'.*error.*',flags:'ig'}],
      'stdout':[{regex:'.*error.*',flags:'ig'}],
      'stderr':[{regex:'.*error.*',flags:'ig'}]
    },*/
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
    if (!this.config.verboseLogging) { this.config.verboseLogging = true }
    this.monitorManager = new MonitorManager(config);
    this.config.monitorMgr = this.monitorManager;
    // this.config.monitorMgr = new MonitorManager(config);;
    
    this.config.logFunction = (severity,origin,msg) => {
      this.config.verboseLogging && console.log(this.name + '                ' + severity.toUpperCase() + " " +origin+" "+ msg);
    };
  }
  
  @action.bound start(){
    this.config.initCommands = this.initCommands;
    this.config.preDestroyCommands = this.preDestroyCommands;
    this.runner = new StatefulProcessCommandProxy(this.config);
  }


  shutdown(){
    return this.runner.shutdown();
  }
  
  addFeature(feature){
    const { name, shell, initCommands, preDestroyCommands } = feature;
    if (this.name !== shell) { throw `Error trying to add feature ${name} shell mismatch (${this.name} != ${shell})`}
    this.registerInitCommands(initCommands);
    this.registerPreDestroyCommands(preDestroyCommands);
  }

  async registerInitCommands(commands = []){
    Array.prototype.push.apply(this.initCommands, commands);
    if (!this.isRunning()) return;
    const promises;
    for (const command of this.initCommands){
      promises.push(this._run(command));
    }
    return await Promise.all(promises);
  }
  registerPreDestroyCommands(commands = []){
    Array.prototype.push.apply(this.preDestroyCommands, commands);
  }
  _run(command) {
      return this.runner.executeCommand(command);
  }

  run(command, context={}, output="json") {
    if (!output) output = 'none'
    output = output.toLowerCase();
    const processJSON = (output === 'json');
    command = parseTemplate(command, context);
    return this._run(command)
      .then((res) => {
        let obj;
        // console.log(`received res : `, res);
        // this.ps.streams
        let res1 = {success: true, data: res.stdout };
        if (res.stderr !== ''){
          res1.errorMessage = res.stderr;
          res1.success = false;
        }
        if (processJSON){        
          let tmp;
          try {
            obj = JSON.parse(res.stdout);
            if (obj === '') { obj = null }
            if (obj === null) { tmp = []; }
            else if (!obj.length) { tmp = [obj]; }
            else if (obj.length) { tmp = obj; }
            res1.success = true;
            res1.data = tmp;
          }
          catch (err){
            obj = {}
            res1.success = false;
            res1.errorMessage = err;
            res1.res = res;
          }
        }
        return res1;
      })
      .catch((err) => {
        console.error(`Runner ERROR while trying to run command ${command}`);
        console.error(err);
        let res1 = {success: false, errorMessage: err};
        return res1;
      });
  }

}
    
    