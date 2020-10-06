const webpack = require('webpack');
const rules = require('./webpack.hurryplugins.config');
const path = require('path');
const fs = require('fs');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const pluginOutputPath = path.join(process.cwd(), "plugins-dist");
const pluginInputPath = path.join(process.cwd(), "plugins-src");
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
    if (!fs.existsSync(path.join(directory, entryName))) {
        console.warn("Skipping plugin : " + pluginName + " (missing " + entryName +").");
        continue;
    }
    console.log('Found plugin: ' + pluginName);
    pluginNames.push(pluginName);
}

for (const plugin of pluginNames){
    buildAndWatchPlugin(plugin);
}
function buildAndWatchPlugin(pluginName){
  // const pluginName = 'dummy-datasource'
  // const pluginName = 'smileytest-plugin'
  // const pluginName = 'about-plugin'
  const entry = path.join(__dirname, 'plugins-src', pluginName, entryName)
  const source = path.join(__dirname, 'plugins-src', pluginName)
  const output = path.join(__dirname, 'plugins-src', pluginName, 'dist')

  const config = {
    mode: 'development',
    devtool: 'source-map',
    entry: entry,
    module: {
      rules: rules
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebPackPlugin({
        patterns: [
          {
            from: source,
            globOptions: {
              ignore: [
                  '**/node_modules',
                  '**/dist',
                  '**/.gitignore',
                  '**/.git',
                  '**/yarn.lock',
                  
            ]},
            to: '.',
            // context: "plugins-src/",
          },
        ],
      }),
    ],
    target: 'node',
    node: {
      __dirname: false
    },
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx']
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
      console.log('[' + new Date().toISOString() + '] Rebuilding plugin ' + pluginName + ' ...');
    // Gets called every time Webpack finishes recompiling.
  });
}