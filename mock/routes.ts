export type IRoute = {
  path: string
  name?: string
  component?: string
  components?: { [name: string]: string }
  redirect?: string
  meta?: {
    title?: string
    icon?: string
    hidden?: boolean
    alwaysShow?: boolean
    breadcrumb?: boolean
    noCache?: boolean
    affix?: boolean
    activedMenu?: string
  }
  children?: IRoute[]
}

const adminRoutes: IRoute[] = [
  {
    path: '',
    component: 'Layout',
    redirect: 'dashboard',
    meta: {
      title: 'dashboard',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'dashboard',
        component: 'dashboard/index',
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  },
  {
    path: '/article',
    component: 'Layout',
    redirect: '/article/list',
    meta: {
      title: 'article',
      icon: 'example'
    },
    children: [
      {
        path: 'list',
        component: 'article/list',
        name: 'Article',
        meta: {
          title: 'article',
          affix: true
        }
      },
      {
        path: 'detail/:id',
        component: 'article/detail',
        name: 'ArticleDetail',
        meta: {
          title: 'articleDetail',
          affix: true,
          hidden: true
        }
      },
      {
        path: 'publish',
        component: 'article/publish',
        name: 'PublishArticle',
        meta: {
          title: 'publishArticle',
          affix: true
        }
      }
    ]
  }
]

export const routes: { [propsName: string]: IRoute[] } = {
  admin: adminRoutes
}
