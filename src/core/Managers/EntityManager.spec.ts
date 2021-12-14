import EntityManager from './EntityManager'

let entityMgr;
beforeAll(async ()=>{
    entityMgr = new EntityManager(configurationManager)
    await shellMgr.start();
        
})
/*

afterAll(async ()=>{
    if (tmpFolder !== ''){
        await rmdirs(tmpFolder);
    }
});
*/

describe("init", () => {
        
    test("init will return true by default", async ()=>{
/*        const dsEnabled = new DummyDatasourceShell(DummyDatasourceDefinition, {disabled:false}, tmpFolder)
        await dsEnabled.setShell(shell);
        expect (dsEnabled.config.disabled).toEqual(false);
*/
    });
    test.todo("init will set config.disabled to true if runInitChecks return false");
});