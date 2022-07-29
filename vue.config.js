const path = require("path");

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

  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        // 全局变量路径，不能使用路径别名
        path.resolve(__dirname, "./src/assets/theme.less"),
      ],
    },
  }
}
