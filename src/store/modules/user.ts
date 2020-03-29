import store from '@/store'
import { VuexModule, Action, Mutation, Module, getModule } from 'vuex-module-decorators'
import { getCookie, setCookie, removeCookie } from '@/utils/cookies'

interface IUserState {
  token: string
  refreshToken?: string | null
  userInfo?: IUserInfo
  // msg?:
}

export interface IUserInfo {
  id: string
  username: string
  password: string
  name: string
  roles: string[]
  // menu:
  email?: string
  tellphone?: string
  avatar?: string
  [propsName: string]: any
}

@Module({ dynamic: true, name: 'UserModule', store })
class User extends VuexModule implements IUserState {
  public token: string = getCookie('token') || ''
  public refreshToken?: string = getCookie('refreshToken') || ''
  public userInfo?: IUserInfo
  @Mutation
  private SET_TOKEN({ token = '', refreshToken = '' }): void {
    setCookie('token', token)
    this.token = token
    refreshToken && setCookie('refreshToken', refreshToken, { expires: 7 })
    this.refreshToken = refreshToken
  }

  @Mutation
  private REMOVE_TOKEN(): void {
    this.token = ''
    removeCookie('token')
    this.refreshToken = ''
    removeCookie('refreshToken')
  }

  @Action
  public async Login(): Promise<void> {
    this.SET_TOKEN({ token: '222', refreshToken: '333' })
  }
  @Action
  public async RefreshToken(): Promise<void> {
    if (this.refreshToken) {
      this.SET_TOKEN({ token: '222', refreshToken: '333' })
    }
  }
  @Action
  public async GetUserInfo(): Promise<void> {
    this.userInfo = {
      id: '1',
      username: 'admin',
      password: '123',
      name: 'zjr',
      roles: ['admin']
    }
  }
  @Action
  public async LogOut(): Promise<void> {
    this.REMOVE_TOKEN()
  }
}

export const UserModule = getModule(User)
