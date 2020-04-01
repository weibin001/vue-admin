import { default as axios, AxiosInstance } from 'axios'
import { Message } from 'element-ui'
import { UserModule } from '@/store/modules/user'

const service: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000
  // withCredentials: true // send cookies when cross-domain requests
})

service.interceptors.request.use(
  config => {
    // Add X-Access-Token header to every request, you can add other custom headers here
    if (UserModule.token) {
      config.headers['X-Access-Token'] = UserModule.token || ''
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const { code, message } = response.data
    if (code !== 20000) {
      Message({
        message: message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(message || 'Error'))
    }
    return response.data
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
