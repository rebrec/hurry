import  Path from  'path'
import  Shell from '../Shell/Shell';
import { ShellFeature, ShellOutputType } from '../Shell/Shell.types'
import { getDirectories, getDirectoriesAsync } from '../helpers/helpers'
import { observable, computed, action, extendObservable } from 'mobx'
import HistoryStore from '../../store/HistoryStore'
import Logger from '../helpers/logging';
const logger = Logger('ShellManager');

if (process.env.NODE_ENV === 'test') {
    (global as any)['__non_webpack_require__'] = require;
}
const { platform } = require('os');

export type CommandElement = {
    shell: any,
    output: ShellOutputType,
    commands: Array<any>

}
export type ContextObject = {}

export interface HistoryStoreMock {
    addCommand: (commandElement: CommandElement, context: ContextObject) => void;
}

export type ShellSettings = {
    shellsPath: string,
    shellFeaturesPath: string,
    isValid: boolean
}

// const shellPath = [
//     'powershell.js'
// ];
// const moduleRoot = Path.join(__dirname, '..', 'modules');

export class ShellManager{

    @observable _shells!: {[key: string]: Shell};
    
    historyStore: HistoryStore;
    _shellFeatures: {};
    _settings: ShellSettings;

    constructor(settings: ShellSettings, historyStore: HistoryStore){
        this._initShell(); // ugly fix due to some incompatibilities using observable with ts code i guess
        
        const { shellsPath, shellFeaturesPath } = settings;
        this._settings = settings;
        this.historyStore = historyStore;
        this._shellFeatures = {};
        // if (!settings.isValid) return;
        
    }
    async scanDirectories(){
        logger.debug('ScanDirectories start');
        const [shellsPaths, featuresPaths] = await Promise.all([getDirectoriesAsync(this._settings.shellsPath), getDirectoriesAsync(this._settings.shellFeaturesPath)]);
        
        for (const path of shellsPaths){
            this.addShellFromPath(path);
        }
        for (const path of featuresPaths){ 
            const config = __non_webpack_require__(path);
            this.addFeature(config.shell, config);
        }
        logger.debug('ScanDirectories end');
    }

    addShellFromPath(path: string){
        const config = __non_webpack_require__(path);
        if (config.platform.indexOf(platform())<0) {
            logger.warn('Skipping incompatible Shell ', config.name);
            return;
        }
        const shell = new Shell(config);
        this.addShell(shell);
    }

    @action.bound _initShell(){
        this._shells = {};
    }

    @action.bound addShell(shell: Shell){
        logger.debug('start of adding Shell', shell.name)
        this._shells[shell.name] = shell; 
        logger.debug('end of adding Shell', shell.name)
    }


    getShells(){
        return this._shells;
    }

    getShell(shellName: string){
        return this._shells[shellName];
    }

    addFeature(shellName: string, shellFeature: ShellFeature ){
        if (!this._shells.hasOwnProperty(shellName)) {
            logger.warn(`Skipping feature ${shellFeature.name} for shell ${shellName} which is not available.`)
            return;
        }
        const shell = this.getShell(shellName);

        shell.addFeature(shellFeature);
    }
    
    runCommand(commandElement: CommandElement, context: ContextObject){
        this.historyStore.addCommand(commandElement, context);
        const shellName = commandElement.shell || 'cmd';
        const shellObj = this.getShell(shellName);
        const output = commandElement.output || 'none';
        for (const command of commandElement.commands){
          logger.info('Running command : ', command);
          shellObj.run(command, context, output);
        }

    }

    async init(){
        await this.scanDirectories();
    }

    async start(){
        const promises = [];
        for (let [shellName, shell] of Object.entries(this._shells)){
            logger.info('Starting shell : ', shellName);
            promises.push(shell.start());
        }
        return await Promise.all(promises);
    }
}
