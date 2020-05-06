import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import variables from '@/styles/_variables.scss'
import elementVariables from '@/styles/element-variables.scss'
import { settings as defaultSettings, ISettings } from '@/settings'

export interface ISetttingsState extends Partial<ISettings> {
  title?: string
  theme: string
  menuBg: string
  // menuText: string
  // menuActiveText: string
}

@Module({ store, dynamic: true, name: 'Setttings' })
class Settings extends VuexModule implements ISetttingsState {
  public theme = localStorage.getItem('theme') || elementVariables.theme
  public menuBg = localStorage.getItem('menuBg') || variables.menuBg
  public fixedHeader = localStorage.getItem('fixedHeader') || defaultSettings.fixedHeader
  public showSettings = localStorage.getItem('showSettings') || defaultSettings.showSettings
  public showTagsView = localStorage.getItem('showTagsView') || defaultSettings.showTagsView
  public showSidebarLogo = localStorage.getItem('showSidebarLogo') || defaultSettings.showSidebarLogo
  public sidebarTextTheme = localStorage.getItem('sidebarTextTheme') || defaultSettings.sidebarTextTheme

  @Mutation
  private CHANGE_SETTING({ key, value }: { key: string; value: string }) {
    if (Object.prototype.hasOwnProperty.call(this, key)) {
      ;(this as any)[key] = value
      localStorage.setItem(key, value)
    }
  }
  @Mutation
  private RESET_SETTING() {
    // this.theme = elementVariables.theme
    // this.menuBg = variables.menuBg
    const keys: string[] = Object.keys(defaultSettings)
    keys.forEach(key => {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        ;(this as any)[key] = defaultSettings[key]
      }
    })
    ;['theme', 'menuBg', 'fixedHeader', 'showSettings', 'showTagsView', 'showSidebarLogo', 'sidebarTextTheme'].forEach(
      key => {
        localStorage.getItem(key) && localStorage.removeItem(key)
      }
    )
  }

  @Action
  public ChangeSetting(payload: { key: string; value: string }) {
    this.CHANGE_SETTING(payload)
  }
  @Action
  public async resetSetting() {
    this.RESET_SETTING()
  }
}

export const SettingsModule = getModule(Settings)
