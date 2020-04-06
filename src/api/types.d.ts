export interface ILoginForm {
  account: string
  password: string
  code?: string
}

interface IQuery {
  page: number
  limit: number
  disabledPage?: boolean // 是否禁用分页，true将会忽略`page`和`limit`参数
}
