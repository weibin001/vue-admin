import { Response, Request, NextFunction } from 'express'
import { userObserver } from './user'

const errorCode = {
  20000: 'success', // success
  50001: 'invalid access token', // invalid access token
  50002: 'invalid access token', // already login in other place
  50003: 'invalid user', // invalid user (user not exist)
  50004: 'access token expired' // access token expired
}

export const accessTokenAuth = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.header('X-Access-Token')
  if (!accessToken) {
    return res.status(401).json({
      code: 50001,
      messaege: errorCode[50001]
    })
  }
  const [account, accessTime] = accessToken.split('token')
  if (userObserver.expiredToken.includes(accessToken)) {
    //login in other place
    return res.json({
      code: 50002,
      message: errorCode[50002]
    })
  } else if (!Object.prototype.hasOwnProperty.call(userObserver.cacheAccount, account)) {
    // not find token
    return res.json({
      code: 50003,
      message: errorCode[50003]
    })
  } else if (userObserver.cacheAccount[account] !== accessToken) {
    return res.json({
      code: 50001,
      message: errorCode[50001]
    })
  } else if (+accessTime < new Date().getTime()) {
    return res.json({
      code: 50004,
      message: ''
    })
  }
  next()
}
