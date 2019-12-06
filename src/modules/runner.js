import Powershell from 'node-powershell';
import Path from 'path';
import { remote } from 'electron';

/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

export default class PowershellRunner {
  constructor() {
    this.ps = new Powershell({
      executionPolicy: 'Bypass',
      noProfile: true,
    });

    const scriptPath = Path.join(__dirname, 'dummy', 'powershell', 'init.ps1');
    // adding this line will  make webpack copy the data.json file at the same location as init.ps1
    const dataFile = Path.join(__dirname, 'dummy', 'powershell', 'data.json'); // basic workaround until i find correct way to let webpack  copy this file


    this.ps.addCommand(`. ${scriptPath}`, []);
    // this.ready = this.ps.invoke();
  }

  _genCommand(command, context){
    console.log('Trying to generate command from template ', command);
    console.log('list of variables :');
    // for (let varName in ["hostname"]){//Object.keys(context)){
    Object.keys(context).forEach((varName, i)=>{
      let varValue = context[varName];
      console.log('Processing template "' + command + '"');
      console.log('    replacing ' + varName + ' with ' + varValue);
      command = command.replace(new RegExp('#\{' + varName + '\}', 'g'), varValue)
      console.log('    ===> RESULT: "' + command + '"');
    })
    return command;
  }

  
  run(command, context={}, output="json") {
    output = output.toLowerCase();
    const processJSON = (output === 'json');
    command = this._genCommand(command, context);
    switch (output){
      case 'json':
          command = `${command} | ConvertTo-Json`
        break;
      case 'none':

      break;
      default:
        throw `Invalid command output ${output}`
    }
    return this._run(command, context)
      .then((res) => {
        let obj;
        console.log(`received res : ${res}`);
        // this.ps.streams
        if (processJSON){
          let res1 = {success: false, data: {}};
          try {
            obj = JSON.parse(res);
            if (obj === null) { return []; }
            if (!obj.length) { return [obj]; }
            res1.success = true;
          }
          catch (err){
            obj = {}
            res1.success = false;
            res1.errorMessage = err;
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

  
  _run(command, context={}) {
    
    this.ps.addCommand(command);
    return this.ps.invoke();
  }

  /*
  Run cmd with JSON output
  Run cmd with no output
  Run cmd with template data with and without output.

  run(cmd, output, variables={},) outpout in {'JSON','none'}
  */
}

