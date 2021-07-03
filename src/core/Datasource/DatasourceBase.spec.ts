import { mkdtemp } from 'fs';
import path from 'path'


import { rmdirs, mkTmpDir } from '../helpers/helpers';
import { DatasourceBase, DatasourceShell, DatasourceJS } from './DatasourceBase'

import Shell from '../Shell/Shell'
// import { ProcessExecutionResult, ShellExecutionResult, ShellOutputType } from './Shell.types'
import poshConfig from '../../modules/shells/powershell'
import { Data } from 'popper.js';
import { DatasourceDefinition, Config } from './Datasource.types';
const DummyDatasourceDefinition: DatasourceDefinition = require('./tests/DummyDatasourceDefinition.json')

const shell = new Shell(poshConfig);
shell.config.verboseLogging = false;
shell.start()
let tmpFolder = "";


const dsConfig = {disabled: false};
class DummyDatasourceShell extends DatasourceShell { _getShellSearchString(kw: string){return "Not implemented"}}
class DummyDatasourceJS extends DatasourceJS { _nativeSearch(kw: string){return Promise.resolve({success: true, data: []})}}

beforeAll(async ()=>{
    tmpFolder = await mkTmpDir("hurrytests-");
    tmpFolder += path.sep;
})

afterAll(async ()=>{
    if (tmpFolder !== ''){
        await rmdirs(tmpFolder);
    }
});

describe ("DatasourceBase", () => {
    describe("constructor", () => {
        test("if modulePath doesn't exist an exception will be thrown", () =>{
            expect(() => new DummyDatasourceShell(DummyDatasourceDefinition, dsConfig, tmpFolder + "aze")).toThrowError("modulePath doesn't exist");            
        });
        test("all datasource parameters should be extracted from datasource definition", () => {
            const ds = new DummyDatasourceShell(DummyDatasourceDefinition, dsConfig, tmpFolder);
            for (const prop of Object.keys(DummyDatasourceDefinition) as Array<keyof DatasourceDefinition>){
                switch (prop) {
                    case 'name':
                    case 'caption':
                        const expectedName = new RegExp("^" + DummyDatasourceDefinition[prop] + '_\\d+');
                        expect(ds[prop]).toMatch(expectedName);    
                        continue;
                }
                expect(ds[prop]).toStrictEqual(DummyDatasourceDefinition[prop]);
            }
        });
        test("missing datasource definition parameters will throw an exception", () =>{
            let badDefs = []
            for (const prop of Object.keys(DummyDatasourceDefinition) as Array<keyof typeof DummyDatasourceDefinition>){
                const tmpDef: DatasourceDefinition = { ...DummyDatasourceDefinition };
                delete tmpDef[prop];
                badDefs.push({missingProp: prop, def:tmpDef});
            }
            for (const badDef of badDefs){
                expect(()=> new DummyDatasourceShell(badDef.def, dsConfig, tmpFolder) ).toThrowError(`Missing Property "${badDef.missingProp}" in datasource definition`);
            }
            const ds = new DummyDatasourceShell(DummyDatasourceDefinition, dsConfig, tmpFolder);
        });
    });

    describe("setShell constructor", () => {
        test("throw an exception if the shell's name is not equal to ds.shellName", async() => {
            const badDef: DatasourceDefinition = { ...DummyDatasourceDefinition };
            badDef.shellName = 'badShellName';
            const ds = new DummyDatasourceShell(badDef, dsConfig, tmpFolder);
            const sh = new Shell(poshConfig);
            await expect(async()=>ds.setShell(sh)).rejects.toThrowError('Invalid Shell provided');
        });
        test("doesn't throw an exception if the shell's name is equal to ds.shellName", async() => {
            const ds = new DummyDatasourceShell(DummyDatasourceDefinition, dsConfig, tmpFolder);
            const sh = new Shell(poshConfig);
            const res = await ds.setShell(sh)
            expect(typeof res).toEqual('boolean');
        });
    });

    describe("init", () => {
        
        test("init will return true by default", async ()=>{
            // class DSInit extends DummyDatasourceShell{
            //     private initResult:boolean;
            //     constructor(def: DatasourceDefinition, cfg: Config, modPath: string,initResult: boolean){
            //         super(def, cfg, modPath);
            //         this.initResult = initResult;
            //     }
            //     async init(): Promise<boolean>{
            //         return Promise.resolve(this.initResult);
            //     }
            // }
            const dsEnabled = new DummyDatasourceShell(DummyDatasourceDefinition, {disabled:false}, tmpFolder)
            await dsEnabled.setShell(shell);
            expect (dsEnabled.config.disabled).toEqual(false);

        });
        test.todo("init will set config.disabled to true if runInitChecks return false");
    });
    
    describe("Instance Counter", () => {
        test("_initInstanceNumber increment counter on a per class basis", ()=>{
            class DSa extends DummyDatasourceShell{}
            class DSb extends DummyDatasourceShell{}
            class DSc extends DatasourceBase{}
            const dsa1 = new DSa(DummyDatasourceDefinition, dsConfig, tmpFolder);
            const dsa2 = new DSa(DummyDatasourceDefinition, dsConfig, tmpFolder);
            const dsc1 = new DSc(DummyDatasourceDefinition, dsConfig, tmpFolder);
            const dsb1 = new DSb(DummyDatasourceDefinition, dsConfig, tmpFolder);
            const dsb2 = new DSb(DummyDatasourceDefinition, dsConfig, tmpFolder);
            const dsc2 = new DSc(DummyDatasourceDefinition, dsConfig, tmpFolder);
            expect(dsa1.instanceId).toEqual(1);
            expect(dsa2.instanceId).toEqual(2);
            expect(dsb1.instanceId).toEqual(1);
            expect(dsb2.instanceId).toEqual(2);
            expect(dsc1.instanceId).toEqual(1);
            expect(dsc2.instanceId).toEqual(2);
        });
    });

    describe("Template Context", () => {
        test("TemplateContext have at least instanceNumberId and modulePath variable non empty", ()=>{
            class DStmp extends DummyDatasourceShell{}
            const ds = new DStmp(DummyDatasourceDefinition, dsConfig, tmpFolder);

            expect(ds.templateContext).toHaveProperty('instanceId');
            expect(ds.templateContext.instanceId).toEqual('1');
            expect(ds.templateContext).toHaveProperty('modulePath');
            expect(ds.templateContext.modulePath).toEqual(tmpFolder);
        });
        test("each key/value from config are set in templateContext", ()=> {
            const config: typeof dsConfig & {apiKey: string, host: string, port: number} = { ...dsConfig, apiKey: "AZEAZE", host: "hostname", port: 8080}

            class DStmp extends DummyDatasourceShell{}
            const ds = new DStmp(DummyDatasourceDefinition, config, tmpFolder);
            expect(ds.templateContext).toStrictEqual({
                instanceId: "1",
                modulePath: tmpFolder,
                apiKey: config.apiKey,
                host: config.host,
                port: config.port
            });
        });
        test("getVariable return value of specific templateContext variable", ()=>{
            const config: typeof dsConfig & {apiKey: string, host: string, port: number} = { ...dsConfig, apiKey: "AZEAZE", host: "hostname", port: 8080}
            class DStmp extends DummyDatasourceShell{}
            const ds = new DStmp(DummyDatasourceDefinition, config, tmpFolder);
            expect(ds.getVariable('instanceId')).toEqual("1");
            expect(ds.getVariable('modulePath')).toEqual(tmpFolder);
            expect(ds.getVariable('apiKey')).toEqual(config.apiKey);
            expect(ds.getVariable('host')).toEqual(config.host);
            expect(ds.getVariable('port')).toEqual(config.port);
        });
          
    })
    
    describe("all getter / setter set and return their respective private variables", () => {
        test.todo("all getter / setter set and return their respective private variables");
    });

    test("if className extends DatasourceJS, _nativeSearch(kw) must be implemented or throw an exception", ()=>{
        class DSBadJS extends DatasourceJS{}
        class DSGoodJS extends DatasourceJS{ _nativeSearch(kw: string){return Promise.resolve({success: true, data: []})}}
        expect(()=> new DSBadJS(DummyDatasourceDefinition, dsConfig, tmpFolder)).toThrowError('Class must implement _nativeSearch');
        expect(()=> new DSGoodJS(DummyDatasourceDefinition, dsConfig, tmpFolder)).not.toThrow();

    });
    test("if className extends DatasourceShell, _getShellSearchString(kw) must be implemented or throw an exception", ()=>{
        class DSBadShell extends DatasourceShell{}
        class DSGoodShell extends DatasourceShell{ _getShellSearchString(kw: string){return kw}}
        expect(()=> new DSBadShell(DummyDatasourceDefinition, dsConfig, tmpFolder)).toThrowError('Class must implement _getShellSearchString');
        expect(()=> new DSGoodShell(DummyDatasourceDefinition, dsConfig, tmpFolder)).not.toThrow();

    });
    
    test.todo("if className is DatasourceShell, getSearchCommand(kw) must return empty string or throw Exception");
    test.todo("if className is DatasourceJS, nativeSearch(kw) must return a searchResult or throw an Exception");
    
    describe("search", () => {
        test.todo("search() should return a searchResult object");
        test.todo("if search succeed, sr.success = true");
        test.todo("if search doesn't succeed, sr.success = false");
        test.todo("sr.data is always an Array");
        test.todo("each sr.data element has a _datasource property with {name, mainColumnProperty, columns} properties), has _pingableProperty");
        test.todo("each columns that has a 'variableName' will generate a result element with property 'variableName' and with value result[property]");
    });
    
    

});

