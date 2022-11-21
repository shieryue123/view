// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:7001',
        pathRewrite: {
          "^/api": ""
        }
      }
    },
  },
  css: {
    loaderOptions: {
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `data` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        prependData: `@import "~@/assets/scss/index.scss";`
      },
      postcss: {
        plugins: [
          require('autoprefixer'),
          require('postcss-px2rem')({
            remUnit: 100
          })
        ]
      }
    }
  },
  configureWebpack: {
    externals: {
      AMap: 'AMap',
      AMapUI: 'AMapUI'
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()

    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .tap(options => {
        return {
          symbolId: 'icon-[name]'
        }
      })
  }
}