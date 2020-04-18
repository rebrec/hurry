
module.exports = [
  // Add support for native node modules
    // modification from https://github.com/electron-userland/electron-forge/issues/1029 to fix node.raw native module import problem when generating a build.
    // {
    //   test: /\.node$/,
    //   use: 'node-loader',
    // },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
        debugLog: true,
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|.webpack)/,
    loaders: [{
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    }],
  },
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|.webpack)/,
    use: 'babel-loader',
  },

];
