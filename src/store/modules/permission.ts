import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { RouteConfig } from 'vue-router'
import { constantRoutes } from '@/router'
import { formatRoutes } from '@/utils/route'
import { IRoute } from '@/api/types'
import store from '@/store'

export interface IPermission {
  routes: RouteConfig[]
  dynamicRoutes: RouteConfig[]
}
@Module({ store, dynamic: true, name: 'permisssion' })
class Permission extends VuexModule implements IPermission {
  public routes: RouteConfig[] = []
  public dynamicRoutes: RouteConfig[] = []

  @Mutation
  private SET_ROUTES(routes: RouteConfig[]) {
    this.routes = constantRoutes.concat(routes)
    this.dynamicRoutes = routes
  }

  @Action({ commit: 'SET_ROUTES' })
  public async GenerateRoutes(routes: IRoute[]) {
    const dynamicRoutes: RouteConfig[] = formatRoutes(routes)
    return dynamicRoutes
  }
}

export const PermissionModule = getModule(Permission)
