const themeColorReplacer = require('webpack-theme-color-replacer')
const forElementUI = require('webpack-theme-color-replacer/forElementUI')
module.exports = new themeColorReplacer({
  fileName: 'css/theme-colors.[contenthash:8].css',
  matchColors: [
    ...forElementUI.getElementUISeries('#409eff') //element-ui主色系列
    // '#0cdd3a',  //自定义颜色
  ],
  changeSelector: forElementUI.changeSelector,
  isJsUgly: process.env.NODE_ENV !== 'development'
})
