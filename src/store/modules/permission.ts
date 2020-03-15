import { VuexModule, Module, getModule } from 'vuex-module-decorators'
// import { RouteConfig } from 'vue-router'
import store from '@/store'

@Module({ store, dynamic: true, name: 'permisssion' })
class Permission extends VuexModule {
  public routes = [
    {
      path: '/',
      name: 'home',
      title: 'home',
      icon: 'dashboard',
      meta: {},
      children: []
    },
    {
      path: 'page1',
      name: 'page1',
      title: 'page1',
      icon: 'dashboard',
      meta: {},
      children: []
    },
    {
      path: 'page2',
      name: 'page2',
      title: 'page2',
      icon: 'dashboard',
      meta: {},
      children: [
        {
          path: 'page2-page1',
          name: 'page2-page1',
          title: 'page2-page1',
          meta: {},
          children: [
            {
              path: 'page2-page1-page1',
              name: 'page2-page1-page1',
              title: 'page2-page1-page1',
              meta: {},
              children: []
            }
          ]
        },
        {
          path: 'page2-page2',
          name: 'page2-page2',
          title: 'page2-page2',
          meta: {},
          children: []
        }
      ]
    },
    {
      path: 'page3',
      name: 'page3',
      title: 'page3',
      icon: 'dashboard',
      meta: {},
      children: [
        {
          path: 'https://element.eleme.cn/#/zh-CN',
          name: 'page3-page1',
          title: 'page3-page1',
          meta: {},
          children: []
        },
        {
          path: 'page3-page2',
          name: 'page3-page2',
          title: 'page3-page2',
          meta: {},
          children: []
        }
      ]
    },
    {
      path: 'page4',
      name: 'page4',
      title: 'page4',
      icon: 'dashboard',
      meta: {},
      children: [
        {
          path: 'page4-page1',
          name: 'page4-page1',
          title: 'page4-page1',
          meta: {},
          children: []
        },
        {
          path: 'page4-page2',
          name: 'page4-page2',
          title: 'page4-page2',
          meta: {},
          children: []
        }
      ]
    },
    {
      path: 'page5',
      name: 'page5',
      title: 'page5',
      icon: 'dashboard',
      meta: {},
      children: []
    },
    {
      path: 'page6',
      name: 'page6',
      title: 'page6',
      icon: 'dashboard',
      meta: {},
      children: []
    },
    {
      path: 'page7',
      name: 'page7',
      title: 'page7',
      icon: 'dashboard',
      meta: {},
      children: []
    },
    {
      path: 'page8',
      name: 'page8',
      title: 'page8',
      icon: 'dashboard',
      meta: {},
      children: []
    },
    {
      path: 'page9',
      name: 'page9',
      title: 'page9',
      icon: 'dashboard',
      meta: {},
      children: []
    },
    {
      path: 'page10',
      name: 'page10',
      title: 'page10',
      icon: 'dashboard',
      meta: {},
      children: []
    },
    {
      path: 'page11',
      name: 'page11',
      title: 'page11',
      icon: 'dashboard',
      meta: {},
      children: []
    },
    {
      path: 'page12',
      name: 'page12',
      title: 'page12',
      icon: 'dashboard',
      meta: {},
      children: []
    }
  ]
}

export const PermissionModule = getModule(Permission)
