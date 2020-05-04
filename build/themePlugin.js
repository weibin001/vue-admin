const ThemeColorReplacer = require('webpack-theme-color-replacer')
const forElementUI = require('webpack-theme-color-replacer/forElementUI')
module.exports = [
  new ThemeColorReplacer({
    fileName: 'theme-colors.[contenthash:8].css',
    matchColors: [
      ...forElementUI.getElementUISeries('#1890ff'), //element-ui主色系列
      '#0cdd3a', //自定义颜色
      '#c655dd'
    ],
    changeSelector: forElementUI.changeSelector
  })
]
