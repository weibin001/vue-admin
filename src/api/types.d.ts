export interface ILoginForm {
  account: string
  password: string
  code?: string
}

//token
export interface IToken {
  accessToken: string
  refreshToken?: string | null
}

//userInfo
export interface IUserInfo {
  id: string
  account: string
  password: string
  name: string
  roles: string[]
  routes: IRoute[]
  // menu:
  email?: string
  tellphone?: string
  avatar?: string
  [propsName: string]: any
}

//routes
export interface IRoute {
  readonly path: string
  readonly name?: string
  component: any
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

export interface IQuery {
  page: number
  limit: number
  disabledPage?: boolean // 是否禁用分页，true将会忽略`page`和`limit`参数
  [propsName: string]: string | number | boolean | undefined
}

export interface IArticleData {
  id: number
  status: string
  title: string
  abstractContent: string
  fullContent: string
  sourceURL: string
  imageURL: string
  timestamp: string | number
  platforms: string[]
  disableComment: boolean
  importance: number
  author: string
  reviewer: string
  type: string
  pageviews: number
}
