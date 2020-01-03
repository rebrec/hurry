

import ShellManager from './core/ShellManager';
const s = new ShellManager();console.log('started');
s.start();
const p = s.getShell('powershell');
const c = s.getShell('cmd');
// console.log(p);
// console.log(s);
setTimeout(_=>{

        p.run('Write-Host salut #{nom}', {nom:"polo"}, "none")
        .then(res=>{
        console.log('res=', res);
    })
    .catch(err=>{
        console.log('error',err);
    })
},5000)
// describe('Array', function() {
    //   describe('#indexOf()', function() {
        //     it('should return -1 when the value is not present', function() {
            //       assert.equal([1, 2, 3].indexOf(4), -1);
            //     });
            //   });
            // });
            