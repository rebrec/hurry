const Path = require('path')
const webpack = require('webpack');
const rules = require('./webpack.hurryplugins.config');
const path = require('path');
const fs = require('fs');
const CopyWebPackPlugin = require('copy-webpack-plugin');

const pluginOutputPath = path.join(process.cwd(), "plugins-dist");
const pluginInputPath = path.join(process.cwd(), "plugins-src");
const plugins = [];

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
    if (!fs.existsSync(path.join(directory, entryName))) {
        console.warn("Skipping plugin : " + pluginName + " (missing " + entryName +").");
        continue;
    }
    console.log('Found plugin: ' + pluginName);
    plugins.push({name: pluginName, path: directory});
}

for (let i=0;i<plugins.length;i++){
    const { name } = plugins[i];
    //entrypoints[pluginName] = path.join(pluginInputPath, name, entryName);
}

// Defining the webpack config inline, but you can replace this
// with `require('./webpack.config.js')`

// const pluginname = "plugin-installer"
const pluginname = "smileytest-plugin"
const entry = Path.join(__dirname, `plugins-src/${pluginname}/index.js`)
const output = Path.join(__dirname, `plugins-src/${pluginname}/dist`)
const config = {
  mode: 'development',
  devtool: 'source-map',
  entry: entry,
  module: {
    rules: rules
  },
  plugins: [
    new CopyWebPackPlugin({
      patterns: [
        {
          from: '**/*',
          to: "",
          context: "plugins-src/" + pluginname,
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
    path: output,
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
