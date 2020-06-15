import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Route } from 'vue-router'
import { UserModule } from '@/store/modules/user'
import { PermissionModule } from '@/store/modules/permission'
import { SettingsModule } from '@/store/modules/settings'
import { changeThemeColor } from '@/utils/themeColorClient'
import i18n from '@/lang'
import { settings } from './settings'

const getPageTitle = (key: string) => {
  const hasKey = i18n.te(`route.${key}`)
  return hasKey ? `${i18n.t(`route.${key}`)}` : settings.title
}

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
          await changeThemeColor(SettingsModule.theme)
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
    // await changeThemeColor('#178fff')
    to.path === '/login' ? next() : next(`/login?redirect=${to.path}`)
  }
  // NProgress.done()
})

router.afterEach((to: Route) => {
  NProgress.done()
  document.title = getPageTitle(to.meta.title)
})
