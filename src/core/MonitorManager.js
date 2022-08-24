const { observable, action } = require('mobx');
import Logger from './helpers/logging';
const logger = Logger('MonitorManager');

export default class MonitorManager{
    @observable monitors = [];
    constructor(config){
        this.name = config.name;
        this.addMonitor = this.addMonitor.bind(this);
    }

    @action.bound addMonitor(process){
        const monitor = new ProcessMonitor(this, process);
        this.monitors.push(monitor);
        return monitor;
    }

    @action.bound removeMonitor(monitor){
        const index = this.monitors.indexOf(monitor);
        if (index < 0) throw "Failed to remove monitor"
        this.monitors.splice(index, 1);
    }
}


class ProcessMonitor{
    @observable output = [];

    constructor(manager, process){
        this.manager = manager;
        this._process = process;
        this.pid = process.pid;
        this._destroyed = false;
        this._onStdInData = this._onStdInData.bind(this);
        this._onStdOutData = this._onStdOutData.bind(this);
        this._onStdErrData = this._onStdErrData.bind(this);
        this._onProcessExit = this._onProcessExit.bind(this);
        this._onProcessError = this._onProcessError.bind(this);
        this._onProcessClose = this._onProcessClose.bind(this);
        this._registerHandlers();
    }

    _hookStdin(){
        this._originalStdinWrite = this._process.stdin.write;
        this._process.stdin.write = this._hookedStdIn.bind(this);
    }

    _unhookStdin(){
        if (this._process && this._process.stdin && this._process.stdin.write) this._process.stdin.write = this._originalStdinWrite;
    }

    _hookedStdIn(chunk, encoding, callback){
        const res = this._originalStdinWrite.call(this._process.stdin, chunk, encoding, callback);
        this._onStdInData(chunk);
        return res;
    }

    _registerHandlers(){
        this._process.stdout.on('data', this._onStdOutData);
        this._process.stderr.on('data', this._onStdErrData);
        this._hookStdin();
        this._process.on('close', this._onProcessClose);
        this._process.on('error', this._onProcessError);
        this._process.on('exit', this._onProcessExit);
    }
    
    @action.bound _recordOutput(type, data){
        this.output.push({
            type: type,
            data: data.toString()
        });
    }

    _onStdInData(data){
        this._recordOutput('stdin', data);
    }

    _onStdOutData(data){
        this._recordOutput('stdout', data);
    }
    _onStdErrData(data){
        this._recordOutput('stderr', data);
    }
    _onProcessError(){
        this.destroy();
    }
    _onProcessClose(){
        this.destroy();
    }
    _onProcessExit(){
        this.destroy();
    }
    destroy(){
        if (this._destroyed) return;
        this._destroyed = true;
        this._unhookStdin();
        this._process = null;
        this.manager.removeMonitor(this);
    }
}
