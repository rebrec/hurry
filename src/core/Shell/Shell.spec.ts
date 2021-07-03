import Shell from './Shell'
import { ProcessExecutionResult, ShellExecutionResult, ShellOutputType } from './Shell.types'
import poshConfig from '../../modules/shells/powershell'
import { rmdirs, mkTmpDir } from '../helpers/helpers';
const { platform } = require('os')

let tmpFolder = "";


const shell = new Shell(poshConfig);
shell.config.verboseLogging = false;
shell.start()


const testObj = {k1:"val1", k2:"val2"};
const poshTextObjStr = '@{k1 = "val1"; k2 = "val2"}'



beforeAll(async () => {
  tmpFolder = await mkTmpDir("hurrytests-");
})

afterAll(async () => {
  const promises = []
  promises.push(shell.shutdown())
  promises.push(Promise.resolve().then(_=>{
    if (tmpFolder !== ''){ return rmdirs(tmpFolder); }
  }));

  await Promise.all(promises);
})

describe ("Shell", () => {
  describe('_run() command execution behaviour', function() {
    test('should output an object', function(){
      const command = 'Write-Host "Test Message"';
      return shell._run(command)
        .then((res: ProcessExecutionResult) => {
          expect(res).toHaveProperty('command');
          expect(res).toHaveProperty('stdout');
          expect(res).toHaveProperty('stderr');
      });
    });

    test('should output stdout when no error', function(){
      const command = 'Write-Host "Test Message"';
      return shell._run(command)
        .then((res: ProcessExecutionResult) => {
          expect(res.command).toEqual(command);
          expect(res.stdout).toEqual('Test Message');
          expect(res.stderr).toEqual('');
      });
    });

    test('should output stderr when there is an error', function(){
      const command = 'Write-Host "Test Message" -ForegroundColor BAD';
      return shell._run(command)
        .then((res: ProcessExecutionResult) => {
          expect(res.command).toEqual(command);
          expect(res.stdout).toEqual('');
          expect(res.stderr).not.toEqual('');
      });
    });
  });
  describe('run() command execution behaviour', function() {
    test('should output stdout when output=NONE', function(){
      const command = 'Write-Host "Test Message"';
      return shell.run(command, {}, ShellOutputType.None)
        .then((res: ShellExecutionResult) => {
          expect(res).toStrictEqual({success: true, data: 'Test Message'});
      });
    });
    test('should deserialize JSON inside res.data when JSON output is used', function(){
      const command = '@(@{k1="val1"}) | ConvertTo-JSON';
      return shell.run(command, {}, ShellOutputType.Json)
        .then((res: ShellExecutionResult) => {
          expect(res).toStrictEqual({success: true, data: [{k1: 'val1'}]});
      });
    });
    test('should return an empty array if there is no output', function(){
      const command = '"" | ConvertTo-JSON';
      return shell.run(command, {})
        .then((res: ShellExecutionResult) => {
          expect(res).toStrictEqual({success: true, data: []})
      });
    });
    test('should return an empty array if there is NULL output', function(){
      const command = '$null | ConvertTo-JSON';
      return shell.run(command, {})
        .then((res: ShellExecutionResult) => {
          expect(res).toStrictEqual({success: true, data: []})
      });
    });
    test('should return an array with 1 element if the output is a single object', function(){
      const command = '@{k1="val1"} | ConvertTo-JSON';
      return shell.run(command, {})
        .then((res: ShellExecutionResult) => {
          expect(res).toStrictEqual({success: true, data: [{k1: 'val1'}]})
      });
    });
    test('multiple results should be stored inside an array', function(){
      return shell.run(`New-Item -ItemType directory -Path ${tmpFolder} -ErrorAction SilentlyContinue`)
        .then((res: ShellExecutionResult) =>{
          return shell.run(`Write-Host 'test' | Out-file '${tmpFolder}/fileA'`, {}, ShellOutputType.None)
        })
        .then((res: ShellExecutionResult) =>{
          return shell.run(`Write-Host 'test' | Out-file '${tmpFolder}/fileB'`, {}, ShellOutputType.None)
        })
        .then((res: ShellExecutionResult) =>{
          return shell.run(`Get-ChildItem '${tmpFolder}' | ConvertTo-Json`)
        })
        .then((res: ShellExecutionResult) =>{
          expect(res.data).toHaveLength(2);
        })
    })

  })
  describe('run() error handling behaviour', function() {
    test('should output error message when there is a json conversion exception', function(){
      const command = '@{k1="val1"} | ConvertTo-JSON -replace ":", "="';
      return shell.run(command, {})
        .then(res => {
          expect(res).toHaveProperty('success');
          expect(res.success).toEqual(false);
          expect(res).toHaveProperty('errorMessage');
          expect(res.errorMessage).not.toEqual('');
      });
    });
    test('should output error message when there is an execution exception occurs', function(){
      const command = 'Write-Host "Test Message" -ForegroundColor BAD';
      return shell.run(command, {}, ShellOutputType.None)
        .then(res => {
          expect(res).toHaveProperty('success');
          expect(res.success).toEqual(false);
          expect(res).toHaveProperty('errorMessage');
          expect(res.errorMessage).not.toEqual('');
      });
    });
  });
  

});
