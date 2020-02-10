import Path from 'path'
import { readdirSync, writeFileSync } from 'fs';
import  ping from "net-ping";
import dns from 'dns';
const dnsPromise = dns.promises;
import net from 'net';



const pingSession = ping.createSession ({
    retries: 1,
    timeout: 1000,
    ttl: 200
});


export const pingHost = (target, options) => {
  options = Object.assign({family:4, all:false }, options);

  let result = {success: false};
  result.target = target;
  return new Promise((resolve, reject)=>{
    if (net.isIP(target)){
      return resolve({address: target});
    } else {
      return resolve(dnsPromise.lookup(target, options));
    }
  })
  // .catch(dnserr => {
  //   return { error: dnserr.toString() };
  // })     
  .then(ipObj=>{
    return new Promise((resolve, reject)=>{
      pingSession.pingHost (ipObj.address, function (error, target) {
        if (error){
          result.success = true;
          result.online = false;
          result.error = error.toString()
        } else {
          result.success = true;
          result.online = true;
        }
        return resolve(result);
      });
    });
  })
  .catch(error=>{
    result.success = true;
    result.online = false;
    result.error = error.toString()
    return result;
  });
}

export const saveConfig = data => {
  const homedir = require('os').homedir();
  const configPath = Path.join(homedir, '.hurry', 'config.js');
  writeFileSync(configPath, "module.exports = " + JSON.stringify(data));
}



    export const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => Path.join(source, dirent.name))
  
  
export const getFiles = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(ent => ent.isFile())
    .map(ent => Path.join(source, ent.name))
  

export const parseTemplate = (text, context) => {
  // console.log('Trying to generate command from template ', command);
  // console.log('list of variables :');
  // for (let varName in ["hostname"]){//Object.keys(context)){
  Object.keys(context).forEach((varName, i)=>{
    let varValue = context[varName];
    // console.log('Processing template "' + command + '"');
    // console.log('    replacing ' + varName + ' with ' + varValue);
    text = text.replace(new RegExp('\#\{' + varName + '\}', 'g'), varValue)
    // console.log('    ===> RESULT: "' + command + '"');
  })
  return text;
}


export const parseTemplateArray = (texts, context) => {
  const res = [];
  for (const text of texts){
    res.push(parseTemplate(text, context)); 
  }
  return res;
}