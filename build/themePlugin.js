const ThemeColorReplacer = require('webpack-theme-color-replacer')
const forElementUI = require('webpack-theme-color-replacer/forElementUI')
module.exports = [
  new ThemeColorReplacer({
    fileName: 'css/theme-colors.[contenthash:8].css',
    matchColors: [
      ...forElementUI.getElementUISeries('#409eff') //element-ui主色系列
      // '#1890ff' //自定义颜色
      // '#c655dd'
    ],
    changeSelector: forElementUI.changeSelector,
    // injectCss: false, // optional. Inject css text into js file, no need to download `theme-colors-xxx.css` any more.
    isJsUgly: process.env.NODE_ENV !== 'development'
  })
]
