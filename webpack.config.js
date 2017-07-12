const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSASS = new ExtractTextPlugin('[name].css');

module.exports = {
  entry: './src/templates/',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSASS.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          }
        }
      },
      {
        test: /\.pug$/,
        use: [{
          loader: 'pug-loader',
          options: {
            doctype: 'html'
          }
        }]
      }
    ]
  },
  plugins: tmpls('./src/templates/')
}
;

function tmpls(dir) {
  let files = fs.readdirSync(dir);
  let result = [];

  files.forEach(function (itm) {
    if (path.extname(itm) == '.pug')
      result.push(
        new HtmlWebpackPlugin({
          filename: itm.replace(path.extname(itm), '.html'),
          title: 'hiw',
          template: './src/templates/' + itm
        })
      );
  });

  result.push(extractSASS);

  return result;
};
