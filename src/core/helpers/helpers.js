
import Path from 'path'
import { readdirSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import  ping from "net-ping";
import dns from 'dns';
const dnsPromise = dns.promises;
import net from 'net';


try {
  const pingSession = ping.createSession ({
      retries: 1,
      timeout: 1000,
      ttl: 200
  });
} catch (e){
  console.error("Need to be run as root to be able to ping hosts. Connectivity test won't be available during this runtime")
}


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

export const saveConfig = (profilePath, data) => {
  const configPath = Path.join(profilePath, 'config.js');
  writeFileSync(configPath, "module.exports = " + JSON.stringify(data));
}



export const getDirectories = (source) => {
  let dirs;
  try {
    dirs = readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => Path.join(source, dirent.name))
  } catch (e){}
  return dirs || [];
}
  
  
export const getFiles = (source) => {
  let files;
  try {
    files = readdirSync(source, { withFileTypes: true })
      .filter(ent => ent.isFile())
      .map(ent => Path.join(source, ent.name))
  } catch (e){}
  return files || [];
}
  

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