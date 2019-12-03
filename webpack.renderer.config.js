const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],

});

rules.push({
  test: /\.s[ca]ss$/,
  use: [
    { loader: "style-loader" },
    { loader: "css-loader" },
    {
      loader: "sass-loader",
      options:{
        sassOptions: {
          prependData: '@import "variables.scss"',
          includePaths: [__dirname, 'src']
        }
      }
    }],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx']
  },
};
