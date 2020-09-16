const path = require('path');
const fs = require('fs');

const command = 'yarn';
const params = [ 'webpack', '--mode', 'development' ];
const pluginDir = "plugins";
const pluginPath = path.join(process.cwd(), pluginDir);
const pluginNames = [];

const entryName = "index.js";
const outputName = "index.bundle.js";

function getDirectories(source) {
    return fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => path.join(source, dirent.name))
}


console.log('Searching for plugins within folder:', pluginPath);

const directories = getDirectories(pluginPath);

for (let i=0;i<directories.length;i++){
    const directory = directories[i];
    const pluginName = directory.split(path.sep).pop();
    if (!fs.existsSync(path.join(directory, entryName))) {
        console.warn("Skipping plugin : " + pluginName + " (missing " + entryName +").");
        continue;
    }
    console.log('Found plugin: ' + pluginName);
    pluginNames.push(pluginName);
}

for (let i=0;i<pluginNames.length;i++){
    const pluginName = pluginNames[i];
    const entry = pluginName + "=" + path.join(pluginPath, pluginName, entryName)
    params.push(entry);
}

params.push("-o");
params.push(pluginDir + path.sep + "[name].bundle.js" );
params.push('-w');
params.push('--output-library aaa');
params.push('--output-library-target');
params.push('"commonjs-module"');
console.log(params);
console.log('Your plugins will be rebuild live by webpack. Just refresh Hurry to use latest version')

require("child_process").spawn(command, params, { cwd: process.cwd(), detached: true, stdio: "inherit" });
