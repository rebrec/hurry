const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const command = 'yarn';
const params = [ 'webpack', '--mode', 'development' ];
const pluginDir = "plugins";
const pluginPath = path.join(process.cwd(), pluginDir);
const pluginNames = [];

const entryName = "index.js";
const outputName = "index.bundle.js";

const entrypoints = {};
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
    entrypoints[pluginName] = path.join(pluginPath, pluginName, entryName);
}

// Defining the webpack config inline, but you can replace this
// with `require('./webpack.config.js')`
const config = {
  mode: 'development',
  entry: entrypoints,
  output: {
    path: pluginPath,
    filename: "[name].bundle.js",
    library: 'plugins',
    libraryTarget: 'commonjs-module'
  }
};
const compiler = webpack(config);
const watcher = compiler.watch({}, function(err,info) {
    if (err) console.error(err);
    console.log('[' + new Date().toISOString() + '] Rebuilding plugins...');
  // Gets called every time Webpack finishes recompiling.
});
