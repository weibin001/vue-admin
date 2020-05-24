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
    path: '/',
    component: 'Layout',
    redirect: '/dashboard',
    meta: {
      icon: 'dashboard'
    },
    children: [
      {
        path: 'dashboard',
        component: 'dashboard/index',
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard'
          // affix: true
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
        name: 'ArticleList',
        meta: {
          title: 'articleList'
        }
      },
      {
        path: 'detail/:id',
        component: 'article/detail',
        name: 'ArticleDetail',
        meta: {
          title: 'articleDetail',
          hidden: true
        }
      },
      {
        path: 'publish',
        component: 'article/publish',
        name: 'PublishArticle',
        meta: {
          title: 'publishArticle'
        }
      }
    ]
  },
  {
    path: '/premission',
    component: 'Layout',
    redirect: '/premission',
    meta: {
      icon: 'lock',
      title: 'premission'
    },
    children: [
      {
        path: '',
        component: 'premission/index',
        name: 'Premission',
        meta: {
          title: 'premission',
          icon: 'lock'
        }
      }
    ]
  },
  {
    path: '/components',
    component: 'Layout',
    meta: {
      title: 'components',
      icon: 'component',
      alwaysShow: true
    },
    children: [
      {
        path: '/components/tinymce',
        component: 'components/tinymce',
        name: 'TinymceDemo',
        meta: {
          title: 'Tinymce',
          activedMenu: '/components'
        }
      },
      {
        path: '/components/markdown',
        component: 'components/markdown',
        name: 'MarkdownDemo',
        meta: {
          title: 'Markdown',
          activedMenu: '/components'
        }
      },
      {
        path: '/components/json-editor',
        component: 'components/json-editor',
        name: 'JsonEditor',
        meta: {
          title: 'JsonEditor',
          activedMenu: '/components'
        }
      }
    ]
  },
  {
    path: 'https://element.eleme.cn/#/zh-CN',
    meta: {
      title: 'ele',
      icon: 'example'
    }
  }
]
const editorRoutes: IRoute[] = [
  {
    path: '/',
    component: 'Layout',
    redirect: '/dashboard',
    meta: {
      icon: 'dashboard'
    },
    children: [
      {
        path: 'dashboard',
        component: 'dashboard/index',
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard'
          // affix: true
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
        name: 'ArticleList',
        meta: {
          title: 'articleList'
        }
      },
      {
        path: 'detail/:id',
        component: 'article/detail',
        name: 'ArticleDetail',
        meta: {
          title: 'articleDetail',
          hidden: true
        }
      },
      {
        path: 'publish',
        component: 'article/publish',
        name: 'PublishArticle',
        meta: {
          title: 'publishArticle'
        }
      }
    ]
  },
  {
    path: 'https://element.eleme.cn/#/zh-CN',
    meta: {
      title: 'ele',
      icon: 'example'
    }
  }
]

export const routes: { [propsName: string]: IRoute[] } = {
  admin: adminRoutes,
  editor: editorRoutes
}
