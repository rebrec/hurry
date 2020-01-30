const { platform } = require('os');
const { parseTemplate } = require('./helpers/helpers');
const StatefulProcessCommandProxy = require("stateful-process-command-proxy");
import { observable, computed, action, extendObservable } from 'mobx'
const Promise = require('promise');
const path = require('path');
import Shell from './Shell'

export default class ShellJS {
    
    @observable runner = {
      _pid2processMap:{ 
        0: {
          _commandHistory: [] 
        }
      } 
    }
    @action.bound addHistory(data){ this.runner._pid2processMap[0]._commandHistory.push(data) }
    
    constructor(){
      this.name = 'js';
    }

// this.run()
    registerInitCommands(commands){

    }
    start(){

    }
    
    run(fn, context, output){
      output = output.toLowerCase();
      const processJSON = (output === 'json');
    
      return Promise.resolve()
      .then(_=>{
        if (typeof(fn) !== 'function') {
          console.warn("Invalid function passed to 'run' function !", fn);
          throw "Invalid function passed to 'run' function !"
        }
        
        return fn();
  
      })
      .then((res) => {
        let obj;
        // console.log(`received res : `, res);
        // this.ps.streams
        if (processJSON){
          let res1 = {success: false, data: {}};
          try {
            obj = JSON.parse(res);
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
        console.error(`Runner ERROR while trying to run js command`);
        console.error(err);
        if (processJSON){
          let res1 = {success: false, errorMessage: err};
          return res1;
        }
        return err;
      });
    }
}
