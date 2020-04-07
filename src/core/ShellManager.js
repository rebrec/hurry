import  Path from  'path'
import  Shell from './Shell';
import { getDirectories } from './helpers/helpers'
import { observable, computed, action, extendObservable } from 'mobx'
import ShellJS from './ShellJS';
const { platform } = require('os');



// const shellPath = [
//     'powershell.js'
// ];
// const moduleRoot = Path.join(__dirname, '..', 'modules');

export default class ShellManager{

    @observable _shells = {};

    constructor(settings, historyStore){
        const { shellsPath, shellFeaturesPath } = settings;
        this.historyStore = historyStore;
        this._shellFeatures = {};
        
        if (!settings.isValid) return;
        const shellsPaths = getDirectories(shellsPath);
        const featuresPaths = getDirectories(shellFeaturesPath);
        
        this._shellFeatures = {};
        this.addShell(new ShellJS());
        for (const path of shellsPaths){
            const config = __non_webpack_require__(path);
            if (config.platform.indexOf(platform())<0) {
                console.log('ShellManager : Skipping incompatible Shell ', config.name);
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

    @action.bound addShell(shell){
        this._shells[shell.name] = shell; 
    }


    getShells(){
        return this._shells;
    }

    getShell(shellName){
        return this._shells[shellName];
    }

    addFeature(shellName, shellFeature){
        if (!this._shells.hasOwnProperty(shellName)) {
            console.log(`Skipping feature ${shellFeature.name} for shell ${shellName} which is not available.`)
            return;
        }
        const shell = this.getShell(shellName);

        shell.addFeature(shellFeature);
    }
    
    runCommand(commandElement, context){
        this.historyStore.addCommand(commandElement, context);
        const shellName = commandElement.shell || 'cmd';
        const shellObj = this.getShell(shellName);
        const output = commandElement.output || 'none';
        for (const command of commandElement.commands){
          console.log('Running command : ', command);
          shellObj.run(command, context, output);
        }

    }

    start(){
        for (let [shellName, shell] of Object.entries(this._shells)){
            console.log('Starting shell : ', shellName);
            shell.start();
        }
    }
}
