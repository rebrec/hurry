const path = require('path');
const rules = []

rules.push({
  test: /^(?!.*\.(js|jsx?|ts|tsx?|css|s[ca]ss)$)/,
  loader: 'file-loader',
  exclude: /(node_modules|.webpack)/,
  options: {
    // context: path.resolve(__dirname, 'plugins-src'),
    publicPath: (url, resourcePath, context) => { 
      const paths = url.split('/');
      if (paths.shift() !== 'plugins-src'){
        console.log('Skipping ' + resourcePath + 'because it is not a "plugin-src" subfolder !')
        return resourcePath;
      }
      const pluginRelativePath = paths.join('/');
      // console.log(url, resourcePath, context, '-> ', pluginRelativePath);
      return `plugin://${pluginRelativePath}`; 
    },
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