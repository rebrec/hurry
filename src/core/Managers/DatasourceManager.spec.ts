import { mkdtemp } from 'fs';
import path from 'path'
import  ShellManager from './ShellManager';

import { rmdirs, mkTmpDir } from '../helpers/helpers';
import DatasourceManager from './DatasourceManager'
import { createPortal } from 'react-dom';
import Datasource from '../Datasource/DatasourceLegacy';

const moduleRoot = path.join(__dirname, '..', '..', 'modules')
const shellSettings = {
    shellsPath: path.join(moduleRoot, 'shells'), 
    shellFeaturesPath: path.join(moduleRoot, 'shellfeatures'),
    isValid: true
}
const historyStore = {
    addCommand: (commandElement: any, context: any)=>{}
}
let shellMgr:ShellManager;
const dsMgrConfig = {
    datasources: {
    }
}

let tmpFolder = "";

beforeAll(async ()=>{
    tmpFolder = await mkTmpDir("hurrytests-");
    tmpFolder += path.sep;

    shellMgr = new ShellManager(shellSettings, historyStore);
    await shellMgr.start();
        
})

afterAll(async ()=>{
    if (tmpFolder !== ''){
        await rmdirs(tmpFolder);
    }
});

describe ("DatasourceManager", () => {
    test("constructor", () => {
        const mgr = new DatasourceManager(shellMgr, dsMgrConfig, historyStore)
        expect(mgr).not.toBe(undefined);
    });
    
    test("can use legacy Datasource Definition", () => {
        const mgr = new DatasourceManager(shellMgr, dsMgrConfig, historyStore)
        const def = require('../Datasource/tests/DemoJSONDatasource.datasource.definition');
        mgr.addDatasourceDefinition(def, path.join(__dirname, '..', 'Datasource', 'tests'));
        const ds = mgr.getDatasource(def.caption);
        expect(ds).not.toEqual(null);
        return ds.search("host3")
        .then((res: DatasourceBase) =>{
            expect(res).toStrictEqual({"success":true,"data":[{"hostname":"host3","username":"user3","something":"else3","datasource":{"name":"demo-json-array-datasource","mainColumnProperty":"hostname","columns":[{"columnName":"Hostname","property":"hostname"},{"columnName":"Username","property":"username"},{"columnName":"Whatever","property":"something"}]},"_pingableProperty":"hostname"}]});
        })
    });



    test("can add DatasourceShell", async()=>{
        const mgr = new DatasourceManager(shellMgr, dsMgrConfig, historyStore)
        const dsTestPath = path.join(__dirname, '..', 'Datasource', 'tests')
        const { DemoJsonDatasourceShell } = require(path.join(dsTestPath, 'DemoDatasources'))
        const newDS = new DemoJsonDatasourceShell();
        await mgr.addDatasource(newDS);
        const ds = mgr.getDatasource(newDS.caption);
        expect(ds).not.toEqual(null);
    });

    test("can search in a DemoJsonDatasourceShell DS Shell", async () => {
        const mgr = new DatasourceManager(shellMgr, dsMgrConfig, historyStore)
        const dsTestPath = path.join(__dirname, '..', 'Datasource', 'tests')
        const { DemoJsonDatasourceShell } = require(path.join(dsTestPath, 'DemoDatasources'))
        DemoJsonDatasourceShell.counter = 0; // to be independant of the unit test order
        const newDS = new DemoJsonDatasourceShell();
        await mgr.addDatasource(newDS);
        const ds = mgr.getDatasource(newDS.caption);
        expect(ds).not.toEqual(null);
        const res = await ds.search("host3");
        expect(res).toStrictEqual({"success":true,"data":[{"hostname":"host3","username":"user3","something":"else3","datasource":{"name":"demo-json-array-datasource-shell_1","mainColumnProperty":"hostname","columns":[{"columnName":"Hostname","property":"hostname"},{"columnName":"Username","property":"username"},{"columnName":"Whatever","property":"something"}]},"_pingableProperty":"hostname"}]});
    });

    test("can add DatasourceJs", async () => {
        const mgr = new DatasourceManager(shellMgr, dsMgrConfig, historyStore)
        const dsTestPath = path.join(__dirname, '..', 'Datasource', 'tests')
        const { DemoJsonDatasourceJS } = require(path.join(dsTestPath, 'DemoDatasources'))
        const newDS = new DemoJsonDatasourceJS();
        await mgr.addDatasource(newDS);
        const ds = mgr.getDatasource(newDS.caption);
        expect(ds).not.toEqual(null);
    });
    
    test("can search in a DemoJsonDatasourceJS DS JS", async () => {
        const mgr = new DatasourceManager(shellMgr, dsMgrConfig, historyStore)
        const dsTestPath = path.join(__dirname, '..', 'Datasource', 'tests')
        const { DemoJsonDatasourceJS } = require(path.join(dsTestPath, 'DemoDatasources'))
        DemoJsonDatasourceJS.counter = 0; // to be independant of the unit test order
        const newDS = new DemoJsonDatasourceJS();
        await mgr.addDatasource(newDS);
        const ds = mgr.getDatasource(newDS.caption);
        expect(ds).not.toEqual(null);
        const res = await ds.search("host3");
        expect(res).toStrictEqual({"success":true,"data":[{"hostname":"host3","username":"user3","something":"else3","datasource":{"name":"demo-json-array-datasource-js_1","mainColumnProperty":"hostname","columns":[{"columnName":"Hostname","property":"hostname"},{"columnName":"Username","property":"username"},{"columnName":"Whatever","property":"something"}]},"_pingableProperty":"hostname"}]});
    });

});

