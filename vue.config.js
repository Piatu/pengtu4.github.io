const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // outputDir: './docs',
  // assetsDir: 'static',
  // publicPath: './',  // 基本路径
  // indexPath: './index.html',
  devServer: {

    proxy: {
      // 自定义代理名,请求时使用
      '/api': {
        // /dy 要映射到 target 域名
        // 要跨域到的网址
        //设置服务器打开的域名
        host: 'piatu.github.io/pengtu4.github.io/',
        target: 'http://gmall-h5-api.atguigu.cn', //结尾没有 / , 千万别多写
        changeOrigin: true, //关键点: 代表需要跨域
        // pathRewrite: {
        // 	// ^ : 正则的字符串开头
        // 	'^/api': '',
        // },
      },
    },
  },
})
