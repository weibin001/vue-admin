const client = require('webpack-theme-color-replacer/client')
const forElementUI = require('webpack-theme-color-replacer/forElementUI')
import settings from '@/settings'
export let curColor: string = settings.themeColor
export function changeThemeColor(newColor: string) {
  const options = {
    newColors: [...forElementUI.getElementUISeries(newColor)]
  }
  return client.changer.changeColor(options, Promise).then(() => {
    curColor = newColor
    localStorage.setItem('theme_color', curColor)
  })
}

export function initThemeColor() {
  const savedColor = localStorage.getItem('theme_color')
  if (savedColor) {
    curColor = savedColor
    changeThemeColor(savedColor)
  }
}
