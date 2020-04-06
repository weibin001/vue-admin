// import faker from 'faker'
import { Response, Request } from 'express'
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
  }
]

export const login = (req: Request, res: Response) => {
  const { account = '', password = '' } = req.body
  const user = userList.find(item => item.account === account)
  if (user) {
    if (user.password === password) {
      return res.json({
        code: 20000,
        data: {
          accessToken: user.account + 'token' + (new Date().getTime() + 0.5 * 60 * 1000),
          refreshToken: new Date().getTime() + 10 * 60 * 1000
        },
        message: ''
      })
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

export const refreshToken = (req: Request, res: Response) => {
  const accessToken = req.header('X-Access-Token')
  const token = req.query.token
  const currentTime = new Date().getTime()
  if (accessToken && currentTime < token) {
    const [account] = accessToken ? accessToken.split('token') : []
    if (account) {
      return res.json({
        code: 20000,
        data: {
          accessToken: account + 'token' + (new Date().getTime() + 0.5 * 60 * 1000),
          refreshToken: new Date().getTime() + 10 * 60 * 1000
        },
        message: ''
      })
    }
    return res.status(500).json({
      code: 50000,
      message: '刷新token失败',
      data: null
    })
  }
  return res.status(500).json({
    code: 50000,
    message: 'error',
    data: null
  })
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
  return res.json({
    code: 20000,
    data: userInfo,
    message: ''
  })
}
