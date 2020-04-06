import service from '@/utils/service'
import { ILoginForm } from './types'
export const login = (data: ILoginForm) =>
  service({
    url: '/users/login',
    method: 'post',
    data
  })

export const getUserInfo = () => service({ url: '/users/userInfo', method: 'get' })
export const refreshToken = (params: { token: string }) =>
  service({ url: '/users/refreshToken', method: 'get', params })
