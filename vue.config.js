const path = require('path')
module.exports = {
  publicPath: '/',
  filenameHashing: true,
  lintOnSave: process.env.NODE_ENV === 'development',
  transpileDependencies: [' vuex-module-decorators '],
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: 'Chrome', //boolean | string 是否自动打开指定或者默认浏览器
    compress: false, //是否启用gzip压缩
    overlay: {
      //是否显示错误或者警告全屏覆盖层
      warnings: false,
      errors: true
    }
  },
  pwa: {
    // name: 'vue-admin'
    // workboxPluginMode: 'InjectMainfest',
    // workboxOptions: {
    //   swSrc: path.resolve(__dirname, 'src/pwa/service-worker.js')
    // }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/styles/_mixins.scss'),
        path.resolve(__dirname, './src/styles/_variables.scss')
      ]
    }
  },
  chainWebpack: config => {
    // 设置全局 快捷路径或方法名 config.resolve.alias.set('~', path.resolve(__dirname, './src')).set('$','jquery/dist/jquery.min.js')
    config.resolve.alias.set('~', path.resolve(__dirname, './src'))
    config.when(process.env.NODE_ENV === 'development', config => config.devtool('cheap-eval-source-map'))
    // config.plugin('workbox')
    // config.plugins.delete('prefetch')
    config.when(process.env.NODE_ENV === 'production', config => {
      config.optimization.splitChunks({
        /*chunks:
         *all: 不管文件是动态还是非动态载入，统一将文件分离。当页面首次载入会引入所有的包
         *async： 将异步加载的文件分离，首次一般不引入，到需要异步引入的组件才会引入。
         *initial：将异步和非异步的文件分离，如果一个文件被异步引入也被非异步引入，那它会被打包两次（注意和all区别），用于分离页面首次需要加载的包
         */
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', //分离ui框架 split elementUI into a single package
            priority: 20, // 权重 the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: path.resolve(__dirname, 'src/components'),
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
