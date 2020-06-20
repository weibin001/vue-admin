import service from '@/utils/service'
import { IQuery } from './types'
export const getArticles = (params: IQuery) =>
  service({
    url: '/articles',
    method: 'get',
    params
  })
