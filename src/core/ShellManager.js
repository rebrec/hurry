import  Path from  'path'
import  Shell from './Shell';
import { getDirectories } from './helpers'

// const shellPath = [
//     'powershell.js'
// ];
const shellModuleRoot = Path.join(__dirname, '..', 'modules', 'shells');
const shellPaths = getDirectories(shellModuleRoot);

export default class ShellManager{
    constructor(){
        this._shells = {};
        for (const path of shellPaths){
            console.log('Processing file :', path);
            const shellConfig = require(Path.join(shellModuleRoot, path));
            console.log(JSON.stringify(shellConfig));
            const shell = new Shell(shellConfig);
            this._shells[shell.name] = shell;
        }
    }

    addFeature(shellName, shellFeature){
        console.error('addFeature not implemented yet');
    }
    
    start(){
        for (let [shellName, shell] of Object.entries(this._shells)){
            console.log('Starting shell : ', shellName);
            shell.start();
        }
    }
}
