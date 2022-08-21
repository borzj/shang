const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 打包不生成map文件
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false, // 关闭eslint

  // 代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
      }
    }
  }
})
