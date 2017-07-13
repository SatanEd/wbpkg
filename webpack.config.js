'use strict';

let webpack = require('webpack');
let path = require('path');
let autoprefixer = require('autoprefixer');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let extractStyles = new ExtractTextPlugin('assets/styles/[name].css');
let HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

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
      path.resolve(__dirname, 'templates/index.pug'),
      path.resolve(__dirname, 'assets/styles/application.scss')
    ],
    main: [
      path.resolve(__dirname, 'assets/styles/styles.scss')
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
        loader: ['html-loader', 'pug-html-loader?pretty&exports=false&doctype=html']
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
              loader: 'postcss-loader'
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
            browsers: ['last 2 version', 'Explorer >= 9', 'Android >= 4']
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
    new HtmlWebpackIncludeAssetsPlugin({ publicPath: 'assets/styles/', assets: [], append: true }),
    extractStyles
  ]
}

module.exports = config;
