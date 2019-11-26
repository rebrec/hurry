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
    this.ready = this.ps.invoke();
  }

  run(command) {
    return this.ready.then(() => {
      this.ps.addCommand(`${command} | ConvertTo-Json`);
      this.ready = this.ps.invoke().then((res) => {
        console.log(`received res : ${res}`);
        JSON.parse(res);
      });
      return this.ready;
    });
  }
}

