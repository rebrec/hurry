import Logger from '../helpers/logging';
import  Path from  'path'
import  Shell from '../Shell/Shell';
import { ShellFeature, ShellOutputType } from '../Shell/Shell.types'
import { getDirectories } from '../helpers/helpers'
import { observable, computed, action, extendObservable } from 'mobx'
import HistoryStore from '../../store/HistoryStore'

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

    constructor(settings: ShellSettings, historyStore: HistoryStore){
        this._initShell(); // ugly fix due to some incompatibilities using observable with ts code i guess
        
        const { shellsPath, shellFeaturesPath } = settings;
        this.historyStore = historyStore;
        this._shellFeatures = {};
        if (!settings.isValid) return;
        const shellsPaths = getDirectories(shellsPath);
        const featuresPaths = getDirectories(shellFeaturesPath);
        
        this._shellFeatures = {};
        for (const path of shellsPaths){
            const config = __non_webpack_require__(path);
            if (config.platform.indexOf(platform())<0) {
                logger.info('ShellManager : Skipping incompatible Shell ', config.name);
                continue;
            }
            const shell = new Shell(config);
            this.addShell(shell);
        }
        for (const path of featuresPaths){ 
            const config = __non_webpack_require__(path);
            this.addFeature(config.shell, config);
        }
    }

    @action.bound _initShell(){
        this._shells = {};
    }

    @action.bound addShell(shell: Shell){
        logger.info('start of adding Shell', shell.name)
        this._shells[shell.name] = shell; 
        logger.info('end of adding Shell', shell.name)
    }


    getShells(){
        return this._shells;
    }

    getShell(shellName: string){
        return this._shells[shellName];
    }

    addFeature(shellName: string, shellFeature: ShellFeature ){
        if (!this._shells.hasOwnProperty(shellName)) {
            logger.info(`Skipping feature ${shellFeature.name} for shell ${shellName} which is not available.`)
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

    async start(){
        const promises = [];
        for (let [shellName, shell] of Object.entries(this._shells)){
            logger.info('Starting shell : ', shellName);
            promises.push(shell.start());
        }
        return await Promise.all(promises);
    }
}
