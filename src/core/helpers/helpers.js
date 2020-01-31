import Path from 'path'
import { readdirSync, writeFileSync } from 'fs';


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