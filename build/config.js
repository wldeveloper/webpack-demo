const path = require('path');
const os = require('os');

const env = precess.env.ACTION;
// 获取本机IP
const hostname = (() => (Object.values(os.networkInterfaces()).reduce((prev, next) => prev.concat(next)).find(item => /IPv4/i.test(item.family) && /^192\.168\.(0|1|2)\./.test(item.address)) || {}).address || 'localhost')();

const config = {
  development: {
    host: 'https://box.51vj.cn:9443/', // 接口
    public: '', // 页面地址
    static: '', // 静态资源
    cdn: '', // 内容分发网络
  },
  production: {
    host: 'https://www.51vj.cn/',
    public: '',
    static: '',
    cdn: '',
  },
};

module.exports = {
  ...(config[env] || {}),
  env,
  app: 'test',
  protocol: 'https',
  hostname,
  port: 8080,
  gateway: '',
  basename: '',
  assets: [],
  buildFolderName: 'dist',
  srcPath: path.resolve(__dirname, 'src'),
  buildPath: path.resolve(__dirname, 'dist'),
  modulesPath: path.resolve(__dirname, 'node_modules'),
  staticPath: path.resolve(__dirname, 'static'),
  common: [
    'react',
    'react-dom',
    'react-router-dom',
  ],
};
