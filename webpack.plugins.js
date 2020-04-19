const path = require ('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = [
  new ForkTsCheckerWebpackPlugin({
    async: false
  }),
  new CopyPlugin([
    { from: path.join('src', 'modules'), to: 'modules' },
  ]),
];

