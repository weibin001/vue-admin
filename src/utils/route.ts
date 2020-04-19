import BasicLayout from '@/layouts/BasicLayout/index.vue'
import Page404 from '@/views/error-page/404.vue'
import { IRoute } from '@/api/types'
type TAsyncRoute = (path: string) => Promise<{ functional: boolean; render: (h: Function) => JSX.Element }>
export const asyncRoute: TAsyncRoute = (path: string) => {
  const asyncComponent = () => ({
    component: import(/* webpackChunkName: '[request]' */ `@/views/${path}.vue`),
    // 异步组件加载时使用的组件
    // loading: LoadingComponent,
    // 加载失败时使用的组件
    error: Page404,
    // 展示加载时组件的延时时间。默认值是 200 (毫秒)
    delay: 100,
    // 如果提供了超时时间且组件加载也超时了，
    // 则使用加载失败时使用的组件。默认值是：`Infinity`
    timeout: 3000
  })
  return Promise.resolve({
    functional: true,
    render(h: Function): JSX.Element {
      // Transparently pass any props or children
      // to the view component.
      return h(asyncComponent)
    }
  })
}

export const formatRoutes: <T extends IRoute>(arg: T[]) => T[] = routes =>
  routes.map(item => ({
    ...item,
    component: item.component === 'Layout' ? BasicLayout : () => asyncRoute(item.component),
    children: item.children ? formatRoutes(item.children) : []
  }))
