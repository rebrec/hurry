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

  run(command) {
    this.ps.addCommand(`${command} | ConvertTo-Json`);
    return this.ps.invoke()
      .then((res) => {
        console.log(`received res : ${res}`);
        this.ps.streams
        const obj = JSON.parse(res);
        if (obj === null) { return []; }
        if (!obj.length) { return [obj]; }
        return obj;
      })
      .catch((err) => {
        console.error(`Runner ERROR while trying to run command ${command}`);
        console.error(err);
      });
  }
}

