const path = require ('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = [
  new ForkTsCheckerWebpackPlugin({
    async: false
  }),
  new CopyPlugin({
      patterns: [
        { from: path.join('src', 'modules'), to: 'modules' },
        { 
          from: path.join('src', 'builtins'), 
          globOptions: {
            ignore: [
                '**/node_modules',
                '**/.gitignore',
                '**/.git',
                '**/yarn.lock',
                
          ]},
          to: 'builtins' 
        },
      ]
  }),
];

