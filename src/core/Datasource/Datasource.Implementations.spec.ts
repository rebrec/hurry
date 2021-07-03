import { autorun } from "mobx";
import { mkdtemp } from 'fs';
import path from 'path'


import { rmdirs, mkTmpDir } from '../helpers/helpers';
import { DatasourceBase, DatasourceShell, DatasourceJS } from './DatasourceBase'

import Shell from '../Shell/Shell'
// import { ProcessExecutionResult, ShellExecutionResult, ShellOutputType } from './Shell.types'
import poshConfig from '../../modules/shells/powershell'

import { Data } from 'popper.js';
import { ShellOutputType } from "../Shell/Shell.types";

import { DemoDatasourceShell, DemoDatasourceJS } from './tests/DemoDatasources'

(poshConfig as any).verboseLogging = false;
let tmpFolder = "";


const dsConfig = {disabled: false};


beforeAll(async ()=>{
    tmpFolder = await mkTmpDir("hurrytests-");
    tmpFolder += path.sep;
})

afterAll(async ()=>{
    if (tmpFolder !== ''){
        await rmdirs(tmpFolder);
    }
    
});

describe ("Datasource Implementations", () => {
  describe("Derived DatasourceJS", () => {
    test.todo("Multiple instances have different instance number starting from 1");
    test("Search() test", () =>{
      const ds1 = new DemoDatasourceJS();
      const ds2 = new DemoDatasourceJS();
      return Promise.all([ds1.search("mykeyword")
        .then(res=>{
          expect(res.success).toEqual(true);
          expect(res.data).toHaveLength(1);
          expect(res.data[0].column1).toEqual("Search - 1");
          expect(res.data[0].column2).toEqual("mykeyword");
        }),
        ds2.search("something")
        .then(res=>{
          expect(res.success).toEqual(true);
          expect(res.data).toHaveLength(1);
          expect(res.data[0].column1).toEqual("Search - 2");
          expect(res.data[0].column2).toEqual("something");
        }),
      ]);
    });
    test.todo("If init fails, datasource is disabled");
  });
    
  describe("Derived DatasourceShell", () => {

    test.todo("Multiple instances have different instance number starting from 1");
            
    test.todo("Multiple instances can init multiple variables thanks to the use of instanceId");
    test("Search() test", async() =>{
      const shell = new Shell(poshConfig);
      shell.config.verboseLogging = false;
      const ds1 = new DemoDatasourceShell();
      ds1.setShell(shell);
      const ds2 = new DemoDatasourceShell();
      ds2.setShell(shell);
      shell.start()

      let res = await ds1.search("test")
      expect(res.success).toEqual(true);
      expect(res.data).toHaveLength(1);
      expect(res.data[0].column1).toEqual("Search 1 result");
      expect(res.data[0].column2).toEqual("test");

      res = await ds2.search("test2")
      expect(res.success).toEqual(true);
      expect(res.data).toHaveLength(1);
      expect(res.data[0].column1).toEqual("Search 2 result");
      expect(res.data[0].column2).toEqual("test2");
      shell.shutdown();
    });

    test.todo("If init fails, datasource is disabled");
    
  });
});

