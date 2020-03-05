import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
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
 * store     | 将store对象传递到模块中
 * dynamic  | 是否注册为动态模块
 * name  | 动态模块时，需要注册名称
 */
@Module({ store, dynamic: true, name: 'app' })
class App extends VuexModule implements IAppState {
  public device = DeviceType.Desktop
  public language = ''
  public sidebar = {
    opened: false,
    withoutAnimation: true
  }
  public size = 'medium'

  @Mutation
  private TOGGLE_DEVICE(device: DeviceType) {
    this.device = device
  }

  @Action
  public toggleDevice(device: DeviceType) {
    this.TOGGLE_DEVICE(device)
  }
}

export const AppModule = getModule(App)
