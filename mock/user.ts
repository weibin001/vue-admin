import { Response, Request } from 'express'
import { IRoute, routes as allRoutes } from './routes'
const userList = [
  {
    id: 0,
    account: 'admin',
    password: 'admin',
    name: 'Super Admin',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    introduction: 'I am a super administrator',
    email: 'admin@test.com',
    phone: '12345678900',
    roles: ['admin']
  },
  {
    id: 1,
    account: 'editor',
    password: 'editor',
    name: 'editor',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    introduction: 'I am a editor',
    email: 'editor@test.com',
    phone: '12345678900',
    roles: ['editor']
  }
]
type TCacheAccount = { [propsName: string]: string }
class UserObserver {
  cacheAccount: TCacheAccount
  expiredToken: string[]
  constructor() {
    this.cacheAccount = {}
    this.expiredToken = []
  }
  //Login Add Token
  async addCacheAccout({ account = '', accessToken = '' }): Promise<void> {
    if (account) {
      Object.prototype.hasOwnProperty.call(this.cacheAccount, account) &&
        this.addExpiredToken(this.cacheAccount[account])
      this.cacheAccount[account] = accessToken
      return Promise.resolve()
    }
    return Promise.reject('error')
  }
  //Refresh Update Token
  async updateCacheAccout({ account = '', accessToken = '' }): Promise<void> {
    if (account && Object.prototype.hasOwnProperty.call(this.cacheAccount, account)) {
      this.cacheAccount[account] = accessToken
      return Promise.resolve()
    }
    return Promise.reject('error')
  }
  // logout Delete Token
  async deletCacheAccount({ account = '', accessToken = '' }): Promise<void> {
    if (account) {
      if (this.cacheAccount[account] === accessToken) {
        //delete cache token
        delete this.cacheAccount[account]
        return Promise.resolve()
      } else if (this.expiredToken.includes(accessToken)) {
        //delete cache expired token
        this.deleteExpiredToken(accessToken)
        return Promise.resolve()
      }
      return Promise.reject('error')
    }
    return Promise.reject('error')
  }
  // Add Expired Token when the account already login in other place
  addExpiredToken(token: string): void {
    this.expiredToken = [...new Set([...this.expiredToken, token])]
  }
  // Delete Expired Token
  deleteExpiredToken(token: string): void {
    const index = this.expiredToken.indexOf(token)
    this.expiredToken.splice(index, 1)
  }
}

export const userObserver = new UserObserver()

export const login = async (req: Request, res: Response) => {
  const { account = '', password = '' } = req.body
  const user = userList.find(item => item.account === account)
  if (user) {
    if (user.password === password) {
      const accessToken: string = user.account + 'token' + (new Date().getTime() + 20 * 60 * 1000)
      try {
        //Cache Token
        await userObserver.addCacheAccout({ account, accessToken })
        return res.json({
          code: 20000,
          data: {
            accessToken,
            refreshToken: new Date().getTime() + 7 * 24 * 60 * 60 * 1000
          },
          message: ''
        })
      } catch (error) {
        return res.status(500).json({
          code: 50000,
          data: null,
          message: error.message || 'error'
        })
      }
    }
    return res.status(500).json({
      code: 50000,
      data: null,
      message: '密码错误'
    })
  }
  return res.status(500).json({
    code: 50000,
    message: '查无用户',
    data: null
  })
}

export const refreshToken = async (req: Request, res: Response) => {
  const accessToken = req.header('X-Access-Token')
  const token = req.body.token
  const currentTime = new Date().getTime()
  if (accessToken) {
    if (currentTime < token) {
      const [account] = accessToken ? accessToken.split('token') : []
      if (account) {
        const newToken = account + 'token' + (new Date().getTime() + 20 * 60 * 1000)
        try {
          await userObserver.updateCacheAccout({ account, accessToken: newToken })
          return res.json({
            code: 20000,
            data: {
              accessToken: newToken,
              refreshToken: new Date().getTime() + 7 * 24 * 60 * 60 * 1000
            },
            message: ''
          })
        } catch (error) {
          return res.status(500).json({
            code: 50000,
            data: null,
            message: error.message || 'error'
          })
        }
      }
      return res.status(500).json({
        code: 50000,
        message: '刷新token失败'
      })
    }
    return res.json({
      code: 50000,
      message: 'Token expired'
    })
  }
  return res.status(500).json({
    code: 50000,
    message: 'error',
    data: null
  })
}

export const logout = async (req: Request, res: Response) => {
  const accessToken = req.header('X-Access-Token')
  const [account] = accessToken ? accessToken.split('token') : []
  try {
    await userObserver.deletCacheAccount({ account, accessToken })
    return res.json({
      code: 20000,
      message: 'success'
    })
  } catch (error) {
    return res.json({
      code: 50000,
      message: error.message || 'error'
    })
  }
}

export const getUserInfo = (req: Request, res: Response) => {
  const accessToken = req.header('X-Access-Token')
  const [account] = accessToken ? accessToken.split('token') : []
  const userInfo = userList.find(item => item.account === account)
  if (!userInfo) {
    return res.status(500).json({
      code: 50004,
      message: '查无用户',
      data: null
    })
  }
  const routes: IRoute[] = userInfo.roles.reduce(
    (result: IRoute[], item: string) =>
      Object.keys(allRoutes).includes(item) ? [...result, ...allRoutes[item]] : result,
    [] as IRoute[]
  )
  return res.json({
    code: 20000,
    data: { ...userInfo, routes },
    message: ''
  })
}
