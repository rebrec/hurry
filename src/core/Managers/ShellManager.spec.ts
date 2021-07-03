import  path from  'path'
import  ShellManager from './ShellManager';
import { observable, computed, action, extendObservable } from 'mobx'
import { platform } from 'os'

const { platform } = require('os');
const moduleRoot = path.join(__dirname, '..', '..', 'modules')
const settings = {
    shellsPath: path.join(moduleRoot, 'shells'), 
    shellFeaturesPath: path.join(moduleRoot, 'shellfeatures'),
    isValid: true
}
const historyStore = {
    addCommand: (commandElement, context)=>{

    };
}

describe('ShellManager', function (){
    test("Instance creation", ()=>{
        const mgr = new ShellManager(settings, historyStore);
        expect(mgr).not.toBe(undefined);
    })
    test("start", ()=>{
        const mgr = new ShellManager(settings, historyStore);
        return mgr.start()
        .then(res =>{
            expect(res.length).toBeGreaterThan(0);
        })
        
    })

    test("getShells", ()=>{
        const mgr = new ShellManager(settings, historyStore);
        expect(Object.keys(mgr.getShells())).toHaveLength(2)
    })

    test("getShell", ()=>{
        const mgr = new ShellManager(settings, historyStore);
        expect(Object.keys(mgr.getShells())).toHaveLength(2)
        switch (platform()){
            case 'linux':
                expect(mgr.getShell('bash')).toHaveProperty('name')
                expect(mgr.getShell('bash').name).toEqual('bash');
                break;
            case 'win32':
                expect(mgr.getShell('cmd')).toHaveProperty('name')
                expect(mgr.getShell('cmd').name).toEqual('cmd');
                break;
            default:
                throw "Unsupported platfom " + platform();
        }
    })

});
