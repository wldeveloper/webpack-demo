const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config.js');

const {
  host,
  cdn,
  env,
  gateway,
  buildFolderName,
} = config;

module.exports = {
  output: {
    path: path.resolve(__dirname, buildFolderName),
  },
  resolve: {
    alias: { // 别名
      vj: '@vj',
      classnames: 'classnames/bind',
      svg: 'react-svg-inline',
      actions$: path.resolve(__dirname, '../src/actions/index.jsx'),
    },
    extensions: ['.js', '.json', '.jsx'],
  },
  externals: {
    echarts: 'echarts',
  },
  plugins: [
    new CleanWebpackPlugin('dist', {
      root: path.resolve(__dirname, '../'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      filename: 'index.html',
      inject: true,
      static: config.static,
      host,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
      'process.env.HOST': JSON.stringify(host),
      'process.env.CDN': JSON.stringify(cdn),
      'process.env.GATEWAY': JSON.stringify(gateway),
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      Component: ['react', 'Component'],
      PureComponent: ['react', 'PureComponent'],
      connect: ['react-redux', 'connect'],
      Switch: ['react-router-dom', 'Switch'],
      Route: ['react-router-dom', 'Route'],
      Redirect: ['react-router-dom', 'Redirect'],
      Link: ['react-router-dom', 'Link'],
      moment: 'moment',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  node: {
    console: false,
    __filename: false,
    // __dirname: false,
    setImmediate: false,
    assert: false,
    buffer: false,
    child_process: false,
    cluster: false,
    constants: false,
    crypto: false,
    dgram: false,
    dns: false,
    domain: false,
    events: false,
    fs: false,
    http: false,
    https: false,
    module: false,
    net: false,
    os: false,
    path: false,
    punycode: false,
    querystring: false,
    readline: false,
    repl: false,
    string_decoder: false,
    sys: false,
    timers: false,
    tls: false,
    tty: false,
    url: false,
    util: false,
    vm: false,
  },
};
