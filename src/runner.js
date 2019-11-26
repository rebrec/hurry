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

    const scriptPath = Path.join(__dirname, 'modules', 'dummy', 'powershell', 'init.ps1');

    this.ps.addCommand(`. ${scriptPath}`, []);
    // this.ready = this.ps.invoke();
  }

  run(command) {
    this.ps.addCommand(`${command} | ConvertTo-Json`);
    return this.ps.invoke()
      .then((res) => {
        console.log(`received res : ${res}`);
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

