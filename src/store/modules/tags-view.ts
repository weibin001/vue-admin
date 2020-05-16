import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { Route } from 'vue-router'

export interface ITagsView extends Partial<Route> {
  title?: string
}

export interface ITagsViewState {
  visitedViews: ITagsView[]
  cachedViews: (string | undefined)[]
  loadingViews: string[]
  // historyViews: ITagsView[]
}

@Module({ name: 'TagsView', dynamic: true, store })
class TagsView extends VuexModule implements ITagsViewState {
  public visitedViews: ITagsView[] = []
  public cachedViews: (string | undefined)[] = []
  public loadingViews: string[] = []
  // public historyViews: ITagsView[] = []

  @Mutation
  private ADD_VISITED_VIEW(view: ITagsView) {
    if (this.visitedViews.some(item => item.path === view.path)) return
    this.visitedViews = [...this.visitedViews, { ...view, title: view?.meta?.title || 'no-title' }]
  }

  @Mutation
  private DEL_VISITED_VIEW(view: ITagsView) {
    for (const [i, v] of this.visitedViews.entries()) {
      if (v.path === view.path) {
        this.visitedViews.splice(i, 1)
        break
      }
    }
  }

  @Mutation
  private UPDATE_VISITED_VIEW(views: ITagsView[]) {
    this.visitedViews = views
  }

  @Mutation
  private DEL_OTHERS_VISITED_VIEWS(view: ITagsView) {
    this.visitedViews = this.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path
    })
  }

  @Mutation
  private DEL_ALL_VISITED_VIEWS() {
    // keep affix tags
    const affixTags = this.visitedViews.filter(tag => tag.meta.affix)
    this.visitedViews = affixTags
  }

  @Mutation
  private ADD_CACHED_VIEW(view: ITagsView) {
    if (view.name && !this.cachedViews.includes(view.name) && !view.meta?.noCache) this.cachedViews.push(view.name)
  }

  @Mutation
  private DEL_CACHED_VIEW(view: ITagsView) {
    if (view.name) {
      const index = this.cachedViews.indexOf(view.name)
      index !== -1 && this.cachedViews.splice(index, 1)
    }
  }

  @Mutation
  private DEL_OTHERS_CACHED_VIEWS(view: ITagsView) {
    if (view.name === null) return
    const index = this.cachedViews.indexOf(view.name)
    if (index > -1) {
      this.cachedViews = this.cachedViews.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      this.cachedViews = []
    }
  }

  @Mutation
  private DEL_ALL_CACHED_VIEWS() {
    this.cachedViews = []
  }

  @Mutation
  private ADD_LOADING_VIEW(viewName: string) {
    if (this.loadingViews.includes(viewName)) return false
    this.loadingViews.push(viewName)
  }

  @Mutation
  private DEL_LOADING_VIEW(viewName: string) {
    const index = this.loadingViews.indexOf(viewName)
    index !== -1 && this.loadingViews.splice(index, 1)
  }

  @Action({ commit: 'ADD_VISITED_VIEW' })
  public addView(view: ITagsView) {
    this.ADD_CACHED_VIEW(view)
    return view
  }

  @Action
  public async deleteView(view: ITagsView) {
    this.DEL_VISITED_VIEW(view)
    this.DEL_CACHED_VIEW(view)
    return Promise.resolve()
  }

  @Action({ commit: 'UPDATE_VISITED_VIEW' })
  public async updateView(views: ITagsView[]) {
    return views
  }

  @Action
  public async deleteCachedView(view: ITagsView) {
    this.DEL_CACHED_VIEW(view)
    return Promise.resolve()
  }

  @Action
  public deleteOthersViews(view: ITagsView) {
    this.DEL_OTHERS_VISITED_VIEWS(view)
    this.DEL_OTHERS_CACHED_VIEWS(view)
  }

  @Action
  public deleteAllViews() {
    this.DEL_ALL_VISITED_VIEWS()
    this.DEL_ALL_CACHED_VIEWS()
    // this.DEL_OTHERS_VISITED_VIEWS(view)
    // this.DEL_OTHERS_CACHED_VIEWS(view)
  }

  @Action({ commit: 'ADD_LOADING_VIEW' })
  public addLoadingView(viewName: string) {
    return viewName
  }

  @Action({ commit: 'DEL_LOADING_VIEW' })
  public delLoadingView(viewName: string) {
    return viewName
  }
}

export const TagsViewModule = getModule(TagsView)
