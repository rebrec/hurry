const rules = []

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