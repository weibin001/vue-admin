import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import elementVariables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

export interface ISetttingsState {
  theme: string
  fixedHeader: boolean
  showSettings: boolean
  showTagsView: boolean
  showSidebarLogo: boolean
  sidebarTextTheme: boolean
}

@Module({ store, dynamic: true, name: 'Setttings' })
class Settings extends VuexModule implements ISetttingsState {
  public theme = elementVariables.theme
  public fixedHeader = defaultSettings.fixedHeader
  public showSettings = defaultSettings.showSettings
  public showTagsView = defaultSettings.showTagsView
  public showSidebarLogo = defaultSettings.showSidebarLogo
  public sidebarTextTheme = defaultSettings.sidebarTextTheme

  @Mutation
  private CHANGE_SETTING({ key, value }: { key: string; value: string | boolean }) {
    if (Object.prototype.hasOwnProperty.call(this, key)) {
      ;(this as any)[key] = value
    }
  }
  @Action
  public changeSetting(payload: { key: string; value: string | boolean }) {
    this.CHANGE_SETTING(payload)
  }
}

export const SettingsModule = getModule(Settings)
