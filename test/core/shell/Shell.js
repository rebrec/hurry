const projectRoot = "../../../src"
import { expect } from "chai"

import Path from 'path'

const Shell = require(projectRoot + '/core/Shell').default
const poshConfig = require(projectRoot + '/modules/shells/powershell')

const shell = new Shell(poshConfig);
shell.config.verboseLogging = false;
shell.start()

describe('Shell', function() {
  const testObj = {k1:"val1", k2:"val2"};
  const poshTextObjStr = '@{k1 = "val1"; k2 = "val2"}'
  describe('Simple command execution', function() {
      it('successful commands should return result within a "data" property', function(done){
        this.slow(2000); // first command execution need to spawn a shell which can take some time
        shell.run(poshTextObjStr + ' | ConvertTo-Json')
        .then(res=>{
          expect(res.hasOwnProperty('data')).to.equal(true);
          done()
        })
      })
      it('data results should be stored inside an array', function(done){
        shell.run(poshTextObjStr + ' | ConvertTo-Json')
        .then(res=>{
          expect(Array.isArray(res.data)).to.equal(true);
          done();
        })
      })
      it('data results should be real objects from json', function(done){
        shell.run(poshTextObjStr + ' | ConvertTo-Json')
        .then(res=>{
          expect(res.data).to.have.length(1);
          expect(res.data[0]).to.eql(testObj);
          done();
        })
      })
      after(function (){
        shell.shutdown()
      })
      
    });
    
    // it('should return -1 when the value is not present', function() {
    //   expect([1, 2, 3].indexOf(4)).to.equal(-1);
    // });
  });
