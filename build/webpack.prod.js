const path = require('path');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const config = require('./config.js');
const webpack = require('webpack');
const cssnano = require('cssnano');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const {
  common,
  app,
  assets,
  staticPath,
  modulesPath,
} = config;

module.exports = merge(commonConfig, {
  bail: true,
  devtool: 'source-map',
  entry: {
    common,
    [app]: path.resolve(__dirname, '../src/index.prod.jsx'),
  },
  output: {
    publicPath: config.static,
    filename: 'js/[name]-[hash:6].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: modulesPath,
      },
      {
        test: /\.s(c|a)ss$/,
        use: ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: `${app}-[hash:6]`,
              sourceMap: false,
              minimize: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('precss')(),
                require('autoprefixer')(),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              loadPath: path.resolve(__dirname, '../'),
            },
          },
        ]),
        exclude: [modulesPath, staticPath],
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              minimize: {
                discardComments: {
                  removeAll: true,
                },
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('precss')(),
                require('autoprefixer')(),
              ],
            },
          },
        ]),
        include: [modulesPath, staticPath],
      }, {
        test: /\.(png|jpe?g|gif|woff|woff2|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `assets/${app}-[name].[ext]`,
            },
          },
          'image-webpack-loader',
        ],
      }, {
        test: /\.svg$/,
        use: [
          'raw-loader',
          'image-webpack-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/common-[hash:6].js',
      minChunks: Infinity,
    }),
    new ExtractTextPlugin({
      filename: 'css/index-[contenthash:6].css',
      ignoreOrder: true,
    }),
    // css优化
    new OptimizeCssAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true,
    }),
    new UglifyJsPlugin({
      parallel: true,
      drop_console: true,
      sourceMap: false,
      uglifyOptions: {
        output: {
          beautify: false,
          ascii_only: true,
        },
        compress: {
          typeofs: false,
          warnings: false,
        },
        warnings: false,
      },
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets,
      append: false,
      publicPath: false,
    }),
  ],
});
