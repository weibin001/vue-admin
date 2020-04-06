import { Response, Request, NextFunction } from 'express'

export const accessTokenAuth = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.header('X-Access-Token')
  if (!accessToken) {
    return res.status(401).json({
      code: 40101,
      message: 'Invalid Access Token'
    })
  }
  const [username, accessTime] = accessToken.split('token')
  if (!username) {
    return res.status(401).json({
      code: 40102,
      message: 'Invalid Access Token'
    })
  } else if (+accessTime < new Date().getTime()) {
    return res.json({
      code: 40103,
      message: 'Token expired'
    })
  }
  next()
}
