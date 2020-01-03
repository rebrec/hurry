import  Path from  'path'
import  Shell from './Shell';
import { getDirectories } from './helpers'





// const shellPath = [
//     'powershell.js'
// ];
// const moduleRoot = Path.join(__dirname, '..', 'modules');

export default class ShellManager{
    constructor(settings){
        const { shellsPath, shellFeaturesPath } = settings;
        
        const shellsPaths = getDirectories(shellsPath);
        const featuresPaths = getDirectories(shellFeaturesPath);
        
        this._shells = {};
        this._shellFeatures = {};
        for (const path of shellsPaths){
            console.log('Processing file :', path);
            const config = __non_webpack_require__(path);
            const shell = new Shell(config);
            this._shells[shell.name] = shell;
        }
        for (const path of featuresPaths){ 
            console.log('Processing file :', path);
            const config = __non_webpack_require__(path);
            console.log('Feature for file ' + config.shell);
            this.addFeature(config.shell, config);
        }
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
    
    start(){
        for (let [shellName, shell] of Object.entries(this._shells)){
            console.log('Starting shell : ', shellName);
            shell.start();
        }
    }
}
