const chalk = require('chalk');
const webpack = require('webpack');
const config = require('./build/config.js');
const webpackDevServer = require('webpack-dev-server');
const openBrowser = require('react-dev-utils/openBrowser');
const clearConsole = require('react-dev-utils/clearConsole');
const devConfig = require('./build/webpack.dev.js');
const getProcessForPort = require('react-dev-utils/getProcessForPort'); // eslint-disable-line
const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages'); // eslint-disable-line

const compiler = webpack(devConfig);
const {
  app,
  basename,
  protocol,
  hostname,
  port,
} = config;
const HOSTNAME = hostname; // 主机名
let PORT = port; // 端口
// 配置输出
compiler.plugin('done', stats => {
  const info = stats.toJson();
  // 错误异常
  if (stats.hasErrors()) {
    clearConsole();
    console.log(chalk.red('编译失败'));
    console.error(info.errors);
    return;
  }
  // 警告异常
  if (stats.hasWarnings()) {
    clearConsole();
    console.log(chalk.yellow(`监听在${protocol}//${HOSTNAME}:${PORT}${basename}`));
    console.warn(info.warnings);
    return;
  }
  // 成功
  clearConsole();
  console.log(chalk.green(`编译成功，监听在${protocol}//${HOSTNAME}:${PORT}${basename}`));
});
// 启动devServer
const runDevServer = (host, port) => {
  devConfig.entry[app][1] = `webpack-dev-server/client?${protocol}//${host}:${port}/`;
  const devServer = new webpackDevServer(compiler, {
    compress: false,
    hot: true,
    noInfo: true,
    publicPath: `${protocol}//${host}:${port}/`,
    clientLogLevel: 'error',
    https: /s/.test(protocol),
    stats: {
      colors: true,
      chunks: false,
      errorDetails: true,
      warnings: true,
    },
    disableHostCheck: true,
    historyApiFallback: {
      rewrites: [{ from: /.*/, to: '/' }],
    },
  });
  devServer.listen(port, host, () => {
    console.log(chalk.cyan('正在启动本地服务…'));
    openBrowser(`${protocol}//${host}:${port}${basename}`);
  });
};
// 启动端口检测程序
choosePort(HOSTNAME, PORT).then(port => {
  if (port == null) return;
  PORT = port;
  runDevServer(HOSTNAME, PORT);
}).catch(err => {
  if (err && err.message) {
    console.log(err.message);
  }
  process.exit(1);
});
