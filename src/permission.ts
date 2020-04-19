import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Route } from 'vue-router'
import { UserModule } from '@/store/modules/user'
import { PermissionModule } from '@/store/modules/permission'

NProgress.configure({ showSpinner: false })
router.beforeEach(async (to: Route, from: Route, next: Function) => {
  NProgress.start()
  if (UserModule.accessToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (UserModule.userInfo.roles.length === 0) {
        try {
          await UserModule.GetUserInfo()
          router.addRoutes(PermissionModule.dynamicRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          UserModule.LogOut()
          next(`/login?redirect=${to.path}`)
        }
      } else {
        next()
      }
    }
  } else {
    to.path === '/login' ? next() : next(`/login?redirect=${to.path}`)
  }
  NProgress.done()
})
