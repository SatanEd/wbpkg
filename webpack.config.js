'use strict';

let webpack = require('webpack');
let path = require('path');
let autoprefixer = require('autoprefixer');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let extractStyles = new ExtractTextPlugin('[name].css')

let config = {
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: true,
    timings: true,
    chunks: false,
    chunkModules: false
  },
  entry: {
    index: [
      path.resolve(__dirname, 'templates/index.pug')
    ],
    'css/application': [
      path.resolve(__dirname, 'assets/styles/application.scss')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: ['html-loader', 'pug-html-loader?pretty&exports=false']
      },
      {
        test: /\.scss$/,
        loader: extractStyles.extract({
          fallback: "style-loader",
          loader: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ],
  })
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      options: {
        postcss: [
          autoprefixer({
            browsers: ['last 2 version', 'Explorer >= 10', 'Android >= 4']
          })
        ],
        sassLoader: {
          includePaths: [
            path.resolve(__dirname, 'node_modules/sanitize.css/')
          ]
        }
      }
    }),
    new HtmlWebpackPlugin({
      title: 'poh',
      template: 'templates/index.pug'
    }),
    extractStyles,
  ]
}

module.exports = config;
