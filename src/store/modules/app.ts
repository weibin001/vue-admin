import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { getCookie, setCookie } from '@/utils/cookies'
import store from '@/store'

export enum DeviceType {
  Mobile,
  Desktop
}

export interface IAppState {
  device: DeviceType
  language: string
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  size: string
}
/**
 * 模块装饰器
 *
 * store | 将store对象传递到模块中
 * dynamic | 是否注册为动态模块
 * name | 动态模块时，需要注册名称
 */
@Module({ store, dynamic: true, name: 'app' })
class App extends VuexModule implements IAppState {
  public device = DeviceType.Desktop
  public language = getCookie('language') || 'en'
  public sidebar = {
    opened: getCookie('sidebar_status') !== 'close',
    withoutAnimation: false
  }
  public size = getCookie('sizeKey') || 'medium'

  @Mutation
  private TOGGLE_SIDEBAR(withoutAnimation: boolean) {
    this.sidebar.opened = !this.sidebar.opened
    this.sidebar.withoutAnimation = withoutAnimation
    if (!this.sidebar.opened) setCookie('sidebar_status', 'closed')
    else setCookie('sidebar_status', 'opened')
  }

  @Mutation
  private CLOSE_SIDEBAR(withoutAnimation: boolean) {
    this.sidebar.opened = false
    this.sidebar.withoutAnimation = withoutAnimation
    setCookie('sidebar_status', 'closed')
  }

  @Mutation
  private TOGGLE_DEVICE(device: DeviceType) {
    this.device = device
  }

  @Mutation
  private TOGGLE_LANGUAGE(language: string) {
    this.language = language
    setCookie('language', language)
  }

  @Action
  public ToggleSideBar(withoutAnimation: boolean) {
    this.TOGGLE_SIDEBAR(withoutAnimation)
  }

  @Action
  public CloseSideBar(withoutAnimation: boolean) {
    this.CLOSE_SIDEBAR(withoutAnimation)
  }

  @Action
  public ToggleDevice(device: DeviceType) {
    this.TOGGLE_DEVICE(device)
  }

  @Action({ commit: 'TOGGLE_LANGUAGE' })
  public ToggleLanguage(language: string) {
    return language
  }
}

export const AppModule = getModule(App)
