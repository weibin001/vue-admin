import { Response, Request } from 'express'

export const uploadFile = (req: Request, res: Response) => {
  // const accessToken = req.header('X-Access-Token')
  return res.json({
    code: 20000,
    message: ''
  })
}
