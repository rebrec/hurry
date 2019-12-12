// const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = [
  new ForkTsCheckerWebpackPlugin({
    async: false
  }),
  // new webpack.ProvidePlugin({ // inject ES5 modules as global vars
  //   $: 'jquery',
  //   jQuery: 'jquery',
  //   'window.jQuery': 'jquery',
  //   Tether: 'tether'
  // })
];

