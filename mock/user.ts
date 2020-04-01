// import faker from 'faker'
import { Response, Request } from 'express'
const userList = [
  {
    id: 0,
    username: 'admin',
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
  const { username = '', password = '' } = req.body
  const user = userList.find(item => item.username === username)
  if (user) {
    if (user.password === password) {
      return res.json({
        code: 20000,
        data: {
          accessToken: user.username + 'token' + new Date().getTime() + 2 * 60 * 1000,
          refreshToken: user.username + 'refreshToken' + new Date().getTime() + 10 * 60 * 1000
        },
        message: ''
      })
    }
    return res.json({
      code: 50004,
      data: null,
      message: '密码错误'
    })
  }
  return res.json({
    code: 50004,
    message: '查无用户',
    data: null
  })
}

export const getUserInfo = (req: Request, res: Response) => {
  const accessToken = req.header('X-Access-Token')
  const [username] = accessToken ? accessToken.split('token') : []
  const userInfo = userList.find(item => item.username === username)
  if (!userInfo) {
    return res.json({
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
