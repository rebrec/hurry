import  path from  'path'
import { getDirectoriesAsync } from './helpers'


const testDirRoot = path.join(__dirname, 'tests');

describe('Helpers', function (){
    test("getDirectoriesAsync", async ()=>{
        let dirs = await getDirectoriesAsync(testDirRoot)
        
        expect(dirs).not.toBe(undefined);
        dirs = dirs.map(el=>{
            return el.split(path.sep).pop();
        })
        expect(dirs).toEqual(["folder1", "folder2"]);
    })



});
