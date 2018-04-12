const path = require('path');
const os = require('os');

const env = process.env.BUILD_ENV;
// 获取本机IP
const hostname = (() => (Object.values(os.networkInterfaces()).reduce((prev, next) => prev.concat(next)).find(item => /IPv4/i.test(item.family) && /^192\.168\.(0|1|2)\./.test(item.address)) || {}).address || 'localhost')();

const config = {
  development: {
    host: '', // 接口
    public: '', // 页面地址
    static: '', // 静态资源
    cdn: '', // 内容分发网络
    assets: [], // 外部脚本
  },
  production: {
    host: '',
    public: '',
    static: '/',
    cdn: '',
    assets: [],
  },
};

module.exports = {
  ...config[env],
  env,
  app: 'test',
  protocol: 'https:',
  hostname,
  port: 8080,
  gateway: '',
  basename: '',
  buildFolderName: 'dist',
  srcPath: path.resolve(__dirname, '../src'),
  buildPath: path.resolve(__dirname, '../dist'),
  modulesPath: path.resolve(__dirname, '../node_modules'),
  staticPath: path.resolve(__dirname, '../static'),
  vendor: [
    'react',
    'react-dom',
    'react-router-dom',
  ],
};
