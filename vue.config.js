module.exports = {
  lintOnSave: false,
  outputDir: "dist",
  // 开发环境显示报错位置 生产环境设置为false减少打包体积
  productionSourceMap: true,

  devServer: {
    port: 88,
    disableHostCheck: true,
    /*overlay: {
      warning: false,
      errors: false
    }*/
  }
}
