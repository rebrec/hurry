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

export const getDownloadURL = function getDownloadURL(packageName){
    const downloadURL = `https://registry.npmjs.org/${packageName}`;
    console.log('downloading ' + downloadURL);
    return fetch(downloadURL)
    .then(response => {
        return response.json();
    })
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
        const content = tempExtractDir + '/package/dist';
        console.log('plugin content is available at', content)
        return content
    });  
}

export const copyNpmPackage = function copyNpmPackage(packagePath, destination){
    ncp(packagePath, destination, function (err) {
        if (err) {
          return console.error(err);
        }
    })
}

export const installNpmPackage = function installNpmPackage(filename, pluginDir){
    return extractNpmPackage(filename)
    .then(tempExtractDir =>{
        return copyNpmPackage(tempExtractDir, pluginDir)
    })
}