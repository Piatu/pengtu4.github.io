const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,

  outputDir: './docs',
  assetsDir: 'static',
  publicPath: './',  // 基本路径
  indexPath: './index.html',

  //关闭Eslint校验
  lintOnSave: false,
  //让浏览器自动打开
  devServer: {
    open: true,
   //设置服务器打开的域名
    host: 'piatu.github.io/pengtu4.github.io/',
    //设置服务器打开的端口号
//     port: 8081,
    //配置代理跨域
    proxy: {
      '/api': {
        target: 'http://sph-h5-api.atguigu.cn',
        changeOrigin: true
      }
    }
  }
});
