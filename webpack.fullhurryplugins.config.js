const path = require('path');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const pluginPath = path.join(process.cwd(), "plugins-dist");
const rules = require('./webpack.hurryplugins.config.js');

console.log('PLUGINPATH',pluginPath);
module.exports = {
    mode: 'development',
    devtool: 'source-map',
    module: { rules: rules },
    plugins: [
      new CopyWebPackPlugin({
        patterns: [
          {
            from: '**/*',
            to: "",
            context: "plugins-src/",
            filter: async (resourcePath) => {
              console.log('BLAH');
              const data = await fs.promises.readFile(resourcePath);
              const content = data.toString();
  
              if (content === 'my-custom-content') {
                return false;
              }
  
              return true;
            },
          },
        ],
      }),
    ],
    output: {
      path: pluginPath,
      filename: "[name].bundle.js",
      library: 'plugin',
      libraryTarget: 'commonjs-module'
    }
  };
