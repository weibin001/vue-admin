import store from '@/store'
import { VuexModule, Action, Mutation, Module, getModule } from 'vuex-module-decorators'
import { PermissionModule } from './permission'
import { getCookie, setCookie, removeCookie } from '@/utils/cookies'
import { login, getUserInfo, refreshToken } from '@/api/users'
import { ILoginForm, IToken, IUserInfo } from '@/api/types'

interface IUserState extends IToken {
  userInfo: IUserInfo
  // msg?:
}

@Module({ dynamic: true, name: 'user', store })
class User extends VuexModule implements IUserState {
  public accessToken: string = getCookie('accessToken') || ''
  public refreshToken: string = getCookie('refreshToken') || ''
  public userInfo: IUserInfo = {
    id: '',
    account: '',
    password: '',
    name: '',
    roles: [],
    routes: []
  }
  @Mutation
  private SET_TOKEN({ accessToken = '', refreshToken = '' }): void {
    setCookie('accessToken', accessToken)
    this.accessToken = accessToken
    refreshToken && setCookie('refreshToken', refreshToken, { expires: 7 })
    this.refreshToken = refreshToken
  }

  @Mutation
  private REMOVE_TOKEN(): void {
    this.accessToken = ''
    removeCookie('accessToken')
    this.refreshToken = ''
    removeCookie('refreshToken')
  }
  @Mutation
  private REMOVE_USERINFO(): void {
    this.userInfo = {
      id: '',
      account: '',
      password: '',
      name: '',
      roles: [],
      routes: []
    }
  }

  @Mutation
  private SET_USERINFO(data: IUserInfo) {
    this.userInfo = data || this.userInfo
  }

  @Action({ commit: 'SET_TOKEN' })
  public async Login(form: ILoginForm): Promise<void> {
    const { data } = await login(form)
    return data
  }
  @Action({ commit: 'SET_TOKEN' })
  public async RefreshToken(): Promise<object> {
    const { data } = await refreshToken({ token: this.refreshToken })
    return data
  }
  @Action({ commit: 'SET_USERINFO' })
  public async GetUserInfo(): Promise<void> {
    const { data } = await getUserInfo()
    await PermissionModule.GenerateRoutes(data.routes)
    return data
  }
  @Action
  public async LogOut(): Promise<void> {
    this.REMOVE_TOKEN()
    this.REMOVE_USERINFO()
  }
}

export const UserModule = getModule(User)
