const client = require('webpack-theme-color-replacer/client')
const forElementUI = require('webpack-theme-color-replacer/forElementUI')
// import { Message } from 'element-ui'
import { SettingsModule } from '@/store/modules/settings'
// export let curColor: string = SettingsModule.theme
export function changeThemeColor(newColor: string) {
  if (newColor === SettingsModule.theme) return
  SettingsModule.ChangeSetting({ key: 'theme', value: newColor })
  const options = {
    newColors: [...forElementUI.getElementUISeries(newColor)]
  }
  return client.changer.changeColor(options, Promise)
}

// export function initThemeColor() {
//   const savedColor = localStorage.getItem('theme_color')
//   if (savedColor) {
//     // curColor = savedColor
//     changeThemeColor(savedColor)
//   }
// }
