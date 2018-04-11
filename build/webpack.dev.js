const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const config = require('./config.js');
const webpack = require('webpack');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

const {
  app,
  modulesPath,
  staticPath,
} = config;

module.exports = merge(common, {
  entry: {
    [app]: [
      'react-hot-loader/patch',
      'webpack-dev-server/client',
      'webpack/hot/only-dev-server',
      path.resolve(__dirname, '../src/index.dev.jsx'),
    ],
  },
  output: {
    filename: `${app}.js`,
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: modulesPath,
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader?cacheDirectory',
        exclude: modulesPath,
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: `${app}-[hash:6]`,
              sourceMap: true,
              minimize: false,
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
        ],
        exclude: [modulesPath, staticPath],
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              minimize: false,
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
        ],
        include: [modulesPath, staticPath],
      }, {
        test: /\.(png|jpe?g|gif|woff|woff2|ttf|eot)$/,
        loader: 'url-loader',
      }, {
        test: /\.svg$/,
        loader: 'raw-loader',
      },
    ],
  },
  plugins: [
    // 打开webpack热加载模块
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    // 跳过编译时出错的代码
    new webpack.NoEmitOnErrorsPlugin(),
    // 确保新引入包时强制重新编译项目
    new WatchMissingNodeModulesPlugin(modulesPath),
  ],
});
