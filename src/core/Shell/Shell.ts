const { platform } = require('os');
const { parseTemplate } = require('../helpers/helpers');
import StatefulProcessCommandProxy from "../helpers/stateful-command-proxy/statefulProcessCommandProxy";
import { observable, computed, action, extendObservable } from 'mobx'
import MonitorManager from "../MonitorManager";
import { ProcessExecutionResult, ShellOutputType, ShellConfigDefinition, ShellFeature, ShellConfigInternal, ShellExecutionResult } from './Shell.types'
import Logger from '../helpers/logging';
const logger = Logger('Shell');
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
    validateFunction: (processProxy: any) => { return processProxy.isValid()},
    initCommands: null,
    preDestroyCommands: null
};



export default class Shell{
  
  @observable runner:any;
  name: string;
  initCommands: Array<string> = [];
  preDestroyCommands: Array<string> = [];
  config!: ShellConfigInternal;
  monitorManager: MonitorManager;

  constructor(config: ShellConfigDefinition){
    this.name = config.name;
    const {initCommands, preDestroyCommands} = config;

    this.registerInitCommands(initCommands);
    this.registerPreDestroyCommands(preDestroyCommands);
    const emptyShellConfig: ShellConfigInternal = { 
      name: "", initCommands: [], preDestroyCommands: [], verboseLogging: false,
      monitorMgr: new MonitorManager({name: "empty"}),
      logFunction: (s: string, o: string, m: string) => {}
    }
    this.config = emptyShellConfig;
    Object.assign(this.config, defaultConfig, config);
    if (!this.config.verboseLogging) { this.config.verboseLogging = true }
    this.monitorManager = new MonitorManager(config);
    this.config.monitorMgr = this.monitorManager;
    // this.config.monitorMgr = new MonitorManager(config);;
    
    this.config.logFunction = (severity,origin,msg) => {
      this.config.verboseLogging && logger.debug(this.name + '                ' + severity.toUpperCase() + " " +origin+" "+ msg);
    };
  }
  
  @action.bound start(){
    this.config.initCommands = this.initCommands;
    this.config.preDestroyCommands = this.preDestroyCommands;
    this.runner = new StatefulProcessCommandProxy(this.config);
  }

  isRunning(){
    logger.error('isRunning: ALWAYS RETURNING FALSE DUE TO BUG THAT FREEZE WHEN RUNNING MULTIPLE PLUGINS USING SAME SHELL DONT FORGET TO FIX')
    logger.error('isRunning: ALWAYS RETURNING FALSE DUE TO BUG THAT FREEZE WHEN RUNNING MULTIPLE PLUGINS USING SAME SHELL DONT FORGET TO FIX')
    logger.error('isRunning: ALWAYS RETURNING FALSE DUE TO BUG THAT FREEZE WHEN RUNNING MULTIPLE PLUGINS USING SAME SHELL DONT FORGET TO FIX')
    logger.error('isRunning: ALWAYS RETURNING FALSE DUE TO BUG THAT FREEZE WHEN RUNNING MULTIPLE PLUGINS USING SAME SHELL DONT FORGET TO FIX')
    logger.error('isRunning: ALWAYS RETURNING FALSE DUE TO BUG THAT FREEZE WHEN RUNNING MULTIPLE PLUGINS USING SAME SHELL DONT FORGET TO FIX')
    logger.error('isRunning: ALWAYS RETURNING FALSE DUE TO BUG THAT FREEZE WHEN RUNNING MULTIPLE PLUGINS USING SAME SHELL DONT FORGET TO FIX')
    logger.error('isRunning: ALWAYS RETURNING FALSE DUE TO BUG THAT FREEZE WHEN RUNNING MULTIPLE PLUGINS USING SAME SHELL DONT FORGET TO FIX')
    logger.error('isRunning: ALWAYS RETURNING FALSE DUE TO BUG THAT FREEZE WHEN RUNNING MULTIPLE PLUGINS USING SAME SHELL DONT FORGET TO FIX')

    return false;
    return this.runner !== undefined;
  }


  shutdown(){
    return this.runner.shutdown();
  }
  
  
  addFeature(feature: ShellFeature){
    const { name, shell, initCommands, preDestroyCommands } = feature;
    if (this.name !== shell) { throw `Error trying to add feature ${name} shell mismatch (${this.name} != ${shell})`}
    this.registerInitCommands(initCommands);
    this.registerPreDestroyCommands(preDestroyCommands);
  }

  async registerInitCommands(commands: string[] = []){
    logger.silly('registerInitCommands: ', commands)

    Array.prototype.push.apply(this.initCommands, commands);
    const promises: Array<any> = [];
    // logger.silly('registerInitCommands: isRunning = ', this.isRunning())

    if (this.isRunning()) {
      for (const command of commands){
        promises.push(this._run(command));
      }

    }
    // for (const command of this.initCommands){
    //   promises.push(this._run(command));
    // }
    return await Promise.all(promises);
  }
  registerPreDestroyCommands(commands: string[] = []){
    Array.prototype.push.apply(this.preDestroyCommands, commands);
  }
  async _run(command: string): Promise<ProcessExecutionResult> {
      logger.silly('_run: ' + command)
      if (!this.runner) throw new Error("You must call start() before trying to execute commands using _run()")
      return this.runner.executeCommand(command);
  }
  executeAsync(command: string, context={}, output: ShellOutputType = ShellOutputType.Json) {
    return this.run(command, context, output);
  }
  async run(command: string, context={}, output: ShellOutputType = ShellOutputType.Json) {
    logger.silly('run: ' + command, {context: context, output: output});
    //output = output.toLowerCase();
    const processJSON = (output === ShellOutputType.Json);

    command = parseTemplate(command, context);
    return this._run(command)
      .then((res: ProcessExecutionResult) => {
        let obj;
        // console.log(`received res : `, res);
        // this.ps.streams
        let res1: ShellExecutionResult = {success: true, data: res.stdout };
        if (res.stderr !== ''){
          res1.errorMessage = res.stderr;
          res1.success = false;
        } else if (processJSON){        
          let tmp;
          try {
            if (res.stdout !== '') { obj = JSON.parse(res.stdout); }
            else { obj = ''}
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
      .catch((err: ExceptionInformation) => {
        console.error(`Runner ERROR while trying to run command ${command}`);
        console.error(err);
        let res1: ShellExecutionResult = {success: false, errorMessage: `${err}`};
        return res1;
      });
  }

}
    
    