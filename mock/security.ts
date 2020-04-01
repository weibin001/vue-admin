import { Response, Request, NextFunction } from 'express'

export const accessTokenAuth = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.header('X-Access-Token')
  if (!accessToken) {
    return res.status(401).json({
      code: 50001,
      messaege: 'Invalid Access Token'
    })
  }
  const [username, accessTime] = accessToken.split('token')
  if (!username) {
    return res.status(401).json({
      code: 50001,
      messaege: 'Invalid Access Token'
    })
  } else if (+accessTime < new Date().getTime()) {
    return res.status(401).json({
      code: 40001,
      messaege: 'Token expired'
    })
  }
  next()
}
