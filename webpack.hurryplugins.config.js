const path = require('path');
const rules = []

rules.push({
  test: /^(?!.*\.(js|jsx?|ts|tsx?|css|s[ca]ss)$)/,
  loader: 'file-loader',
  options: {
    context: path.resolve(__dirname, 'plugins'),
    publicPath: (url, resourcePath, context) => { return `plugin://${url}`; },
    name: '[path][name].[ext]'
  },
}); 

rules.push(
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
)


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



module.exports = rules;