import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { Route } from 'vue-router'

export interface ITagsView extends Partial<Route> {
  title?: string
}

export interface ITagsViewState {
  visitedViews: ITagsView[]
  cachedViews: (string | undefined)[]
}

@Module({ name: 'TagsView', dynamic: true, store })
class TagsView extends VuexModule implements ITagsViewState {
  public visitedViews: ITagsView[] = []
  public cachedViews: (string | undefined)[] = []

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

  @Action({ commit: 'ADD_VISITED_VIEW' })
  public addView(view: ITagsView) {
    this.ADD_CACHED_VIEW(view)
    return view
  }
  @Action
  public deleteView(view: ITagsView) {
    // this.ADD_CACHED_VIEW(view)
    this.DEL_VISITED_VIEW(view)
    this.DEL_CACHED_VIEW(view)
  }
}

export const TagsViewModule = getModule(TagsView)
