import { ncp } from 'ncp'
import { nanoid } from 'nanoid'
import Path from 'path'
import fetch from 'node-fetch'
import { searchByKeywords } from 'search-packages'
import { tmpdir } from 'os';
import targz from 'targz'

import util from 'util'
import fs from 'fs'
const streamPipeline = util.promisify(require('stream').pipeline)


export const searchPlugin = function searchPlugin(keyword){
    return searchByKeywords(['hurry-admin-plugin'], keyword)
}

export const getPluginInfos = function getPluginInfos(packageName){
    const downloadURL = `https://registry.npmjs.org/${packageName}`;
    console.log('downloading ' + downloadURL);
    return fetch(downloadURL)
    .then(response => {
        return response.json();
    })
}

export const getDownloadURL = function getDownloadURL(packageName){
    return getPluginInfos(packageName)
    .then(json => {
        const latestTag = json['dist-tags'].latest;
        const tarballURL = json.versions[latestTag].dist.tarball;
        return tarballURL;
    });
}

function download(url){
    return fetch(url)
    .then(res => {
        if (!res.ok) throw new Error(`unexpected response ${res.statusText}`);
        const filename = url.split('/').pop();
        if (filename.length === 0) throw new Error('Invalid filename extracted from download url' + url);
        const savedFile = Path.join(tmpdir(),filename);
        return streamPipeline(res.body, fs.createWriteStream(savedFile))
        .then(_=>{
            return savedFile
        })
    })
}

export const downloadNpmPackage = function downloadNpmPackage(packageName){
    return getDownloadURL(packageName)
        .then(url=>{
            return download(url);
        })
}

export const extractNpmPackage = function extractNpmPackage(filename){
    const tempExtractDir = Path.join(tmpdir(),nanoid());
    console.log('decompress', filename)
    return new Promise((resolve, reject) => {
        targz.decompress({
            src: filename,
            dest: tempExtractDir
        }, function(err){
            if(err) {
                return reject(err);
            }
            return resolve();
        })
    })
    .then(_=>{
        const packageName = __non_webpack_require__(Path.join(tempExtractDir, 'package', 'package.json')).name;
        const newFolderName = Path.join(tempExtractDir, packageName);
        
        return new Promise((resolve, reject) =>{
            fs.rename(Path.join(tempExtractDir, 'package'), newFolderName, err=>{
                if (err) return reject();
                return resolve();
            })
        })
        .then(_=>{
            console.log('plugin content is available at', newFolderName)
            return newFolderName
        })
    });  
}

export const copyNpmPackage = function copyNpmPackage(packagePath, destination){
    console.log('copy ' + packagePath + ' ==> ' + destination)
    ncp(packagePath, destination, function (err) {
        if (err) {
          return console.error(err);
        }
    })
}

export const installNpmPackage = function installNpmPackage(filename, pluginDir){
    return extractNpmPackage(filename)
    .then(tempExtractDir =>{
        return new Promise((resolve,reject)=>{
            setTimeout(_=>{
                resolve()
            },2000);    
        }).then(_=>{
            return copyNpmPackage(Path.join(tempExtractDir, '..'), pluginDir)
        })
        
    })
}