const path = require('path');

const pluginPath = path.join(process.cwd(), "plugins", "dist");
const rules = require('./webpack.hurryplugins.config.js');

console.log('PLUGINPATH',pluginPath);
module.exports = {
    mode: 'development',
    devtool: 'source-map',
    module: { rules: rules },
    output: {
      path: pluginPath,
      filename: "[name].bundle.js",
      library: 'plugin',
      libraryTarget: 'commonjs-module'
    }
  };
