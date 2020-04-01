import service from '@/utils/service'
export const login = (data: { username: string; password: string }) =>
  service({
    url: '/users/login',
    method: 'post',
    data
  })
