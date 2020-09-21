const webpack = require('webpack');
const rules = require('./webpack.hurryplugins.config');
const path = require('path');
const fs = require('fs');
const CopyPlugin = require('copy-webpack-plugin');

const pluginOutputPath = path.join(process.cwd(), "plugins", "dist");
const pluginInputPath = path.join(process.cwd(), "plugins");
const pluginNames = [];

const entryName = "index.js";

const entrypoints = {};
function getDirectories(source) {
    return fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => path.join(source, dirent.name))
}


console.log('Searching for plugins within folder:', pluginInputPath);

const directories = getDirectories(pluginInputPath);

for (let i=0;i<directories.length;i++){
    const directory = directories[i];
    const pluginName = directory.split(path.sep).pop();
    if (pluginName === 'dist') continue;
    if (!fs.existsSync(path.join(directory, entryName))) {
        console.warn("Skipping plugin : " + pluginName + " (missing " + entryName +").");
        continue;
    }
    console.log('Found plugin: ' + pluginName);
    pluginNames.push(pluginName);
}

for (let i=0;i<pluginNames.length;i++){
    const pluginName = pluginNames[i];
    entrypoints[pluginName] = path.join(pluginInputPath, pluginName, entryName);
}

// Defining the webpack config inline, but you can replace this
// with `require('./webpack.config.js')`
const config = {
  mode: 'development',
  devtool: 'source-map',
  entry: entrypoints,
  module: {
    rules: rules
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { 
          from: 'plugins/**/*', 
          to: '',
          globOptions: {
            ignore: ['**/dist/**/*'],
          },
        },
      ],
    }),
  ],
  node: {
    __dirname: false
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx']
  },
  output: {
    path: pluginOutputPath,
    filename: "[name].bundle.js",
    library: 'plugin',
    libraryTarget: 'commonjs-module'
  }
};
const compiler = webpack(config);
const watcher = compiler.watch({}, function(err,info) {
    if (err) console.error(err);
    console.log('[' + new Date().toISOString() + '] Rebuilding plugins...');
  // Gets called every time Webpack finishes recompiling.
});
