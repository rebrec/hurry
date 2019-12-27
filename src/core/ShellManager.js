import  Path from  'path'
import  Shell from './Shell';
import { getDirectories } from './helpers'

// const shellPath = [
//     'powershell.js'
// ];
const moduleRoot = Path.join(__dirname, '..', 'modules');
const shellRoot = Path.join(moduleRoot, 'shells');
const shellPaths = getDirectories(shellRoot);
const featureRoot = Path.join(moduleRoot, 'shellfeatures');
const featurePaths = getDirectories(featureRoot);

export default class ShellManager{
    constructor(){
        this._shells = {};
        this._shellFeatures = {};
        for (const path of shellPaths){
            console.log('Processing file :', path);
            const config = require(Path.join(shellRoot, path));
            const shell = new Shell(config);
            this._shells[shell.name] = shell;
        }
        for (const path of featurePaths){ 
            console.log('Processing file :', path);
            const config = require(Path.join(featureRoot, path));
            console.log('Feature for file ' + config.shell);
            this.addFeature(config.shell, config);
        }
        this.start();
    }

    getShell(shellName){
        return this._shells[shellName];
    }

    addFeature(shellName, shellFeature){
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
