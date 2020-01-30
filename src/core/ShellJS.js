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
      
    }

// this.run()

    run(fn, context, output){
      return Promise.resolve()
      .then(_=>{
        if (typeof(fn) !== 'function') {
          console.warn("Invalid function passed to 'run' function !", fn);
          throw "Invalid function passed to 'run' function !"
        }

        return fn.bind(fn, keyword)
  
      })
    }
}
