const webpack = require('webpack');
const rules = require('./webpack.hurryplugins.config');
const path = require('path');
const fs = require('fs');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const pluginOutputPath = path.join(process.cwd(), "plugins-dist");
const pluginInputPath = path.join(process.cwd(), "plugins-src");
const builtinsInputPath = path.join(process.cwd(), "src", "builtins");
const plugins = [];

const entryName = "index.js";

const entrypoints = {};
function getDirectories(source) {
    return fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => path.join(source, dirent.name))
}

class WatchRunPlugin {
  apply(compiler) {
    compiler.hooks.watchRun.tap('WatchRun', (comp) => {
      const changedTimes = comp.watchFileSystem.watcher.mtimes;
      const changedFiles = Object.keys(changedTimes)
        .map(file => `\n  ${file}`)
        .join('');
      if (changedFiles.length) {
        console.log("====================================")
        console.log('NEW BUILD FILES CHANGED:', changedFiles);
        console.log("====================================")
      }
    });
  }
}

console.log('Searching for plugins within folder:', pluginInputPath);

let directories = getDirectories(pluginInputPath);
directories.push(...getDirectories(builtinsInputPath));

for (let i=0;i<directories.length;i++){
    const directory = directories[i];
    const pluginName = directory.split(path.sep).pop();
    const entrypoint = path.join(directory, entryName)
    if (!fs.existsSync(entrypoint)) {
        console.warn("Skipping plugin : " + pluginName + " (missing " + entryName +").");
        continue;
    }
    console.log('Found plugin: ' + pluginName);
    plugins.push({name: pluginName, entry: entrypoint, rootdir: directory});
}
for (const plugin of plugins){
    buildAndWatchPlugin(plugin);
}
function buildAndWatchPlugin(plugin){
  // const pluginName = 'dummy-datasource'
  // const pluginName = 'smileytest-plugin'
  // const pluginName = 'about-plugin'
  const {name, entry, rootdir} = plugin;
  const source = rootdir;
  const output = path.join(rootdir, 'dist')

  const config = {
    mode: 'development',
    devtool: 'source-map',
    entry: entry,
    module: {
      rules: rules
    },
    plugins: [
      // new WatchRunPlugin(),
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
  const watcher = compiler.watch({ ignored: /dist/ }, function(err,info) {
      if (err) console.error(err);
      console.log('[' + new Date().toISOString() + '] Rebuilding plugin ' + name + ' ...');
    // Gets called every time Webpack finishes recompiling.
  });
}
