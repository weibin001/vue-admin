import BasicLayout from '@/layouts/BasicLayout/index.vue'
import Page404 from '@/views/error-page/404.vue'
import { TagsViewModule } from '@/store/modules/tags-view'
import { IRoute } from '@/api/types'
type TAsyncRoute = (item: IRoute) => Promise<{ functional: boolean; render: (h: Function, props: any) => JSX.Element }>
export const asyncRoute: TAsyncRoute = (item: IRoute) => {
  const asyncComponent = () => ({
    component: import(/* webpackChunkName: '[request]' */ `@/views/${item.component}.vue`),
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
    name: item.name,
    functional: true, // functional Component without lifecycle
    render: (h: Function): JSX.Element =>
      h(asyncComponent, {
        on: {
          'hook:beforeCreate': () => {
            item.name && TagsViewModule.addLoadingView(item.name)
          },
          'hook:mounted': () => {
            item.name && TagsViewModule.delLoadingView(item.name)
          }
          // handleManualMounted: () => {
          //   // Manual Close Tag Loading Event
          //   item.name && TagsViewModule.delLoadingView(item.name)
          // }
        }
      })
  })
}

export const formatRoutes: <T extends IRoute>(arg: T[]) => T[] = routes =>
  routes.map(item => ({
    ...item,
    component: item.component === 'Layout' ? BasicLayout : () => asyncRoute(item),
    children: item.children ? formatRoutes(item.children) : []
  }))
