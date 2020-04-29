<template>
  <div class="tags-view-container">
    <transition-group class="tags-view-wrapper" name="el-zoom-in-center" tag="ul">
      <router-link
        class="tags-view-item"
        tag="li"
        :to="{ path: tag.path }"
        v-for="tag in visitedViews"
        :key="tag.path"
        @contextmenu.prevent.stop.native="openContextMenu($event, tag)"
      >
        <svg-icon :name="tag.meta && tag.meta.icon ? tag.meta.icon : 'earth'" />
        <span class="tags-view-title">
          {{ tag.meta.title }}
        </span>
        <div class="tags-view-icon-wrapper">
          <span v-if="!tag.meta.affix" class="tags-view-icon" @click.prevent.stop="closeSelectedTag(tag)">
            <i class="el-icon-close"></i>
          </span>
        </div>
      </router-link>
    </transition-group>
    <context-menu :visible.sync="visible" :style="styleObj">
      <li class="context-menu-item" @click="refreshSelectedTag(selectedTag)">重新加载</li>
      <li class="context-menu-item" @click="openBlankSelectedTag(selectedTag)">将标签页移至新窗口</li>
      <el-divider></el-divider>
      <li
        class="context-menu-item"
        :class="{ 'context-menu-item__disabled': selectedTag.meta && selectedTag.meta.affix }"
        @click="selectedTag.meta && selectedTag.meta.affix ? null : closeSelectedTag(selectedTag)"
      >
        关闭
      </li>
      <li class="context-menu-item">关闭其他标签页</li>
      <li class="context-menu-item">关闭全部标签页</li>
    </context-menu>
  </div>
</template>

<script lang="ts">
import path from 'path'
import { Vue, Component, Watch } from 'vue-property-decorator'
import { RouteConfig } from 'vue-router'
import ContextMenu from './ContextMenu.vue'
import { TagsViewModule, ITagsView } from '@/store/modules/tags-view'
import { PermissionModule } from '@/store/modules/permission'
interface IStyleObj {
  left: string
  top: string
  [propsName: string]: string
}
@Component({
  name: 'TagsView',
  components: {
    ContextMenu
  }
})
export default class extends Vue {
  private visible = false
  private selectedTag: ITagsView = {}
  private styleObj: IStyleObj = {
    left: 0 + 'px',
    top: 0 + 'px'
  }

  get visitedViews() {
    return TagsViewModule.visitedViews
  }

  get routes() {
    return PermissionModule.routes
  }

  get affixTags(): ITagsView[] {
    const recursive: (routes: RouteConfig[], basePath: string) => ITagsView[] = (routes, basePath = '/') =>
      routes.reduce((previousValue, currentValue) => {
        const routePath: string = path.resolve(basePath, currentValue.path)
        const item = {
          fullPath: routePath,
          path: routePath,
          name: currentValue.name,
          meta: { ...currentValue.meta }
        }
        if (currentValue.children && currentValue.children.length > 0) {
          return currentValue?.meta?.affix
            ? [...previousValue, item, ...recursive(currentValue.children, routePath)]
            : [...previousValue, ...recursive(currentValue.children, routePath)]
        }
        return currentValue?.meta?.affix ? [...previousValue, item] : previousValue
      }, [] as ITagsView[])
    return recursive(this.routes, '/')
  }

  @Watch('$route')
  private onRouteChange() {
    this.addTags()
  }
  @Watch('visible')
  private onVisibleChange(value: boolean) {
    if (value) {
      document.body.addEventListener('click', this.closeContextMenu)
    } else {
      document.body.removeEventListener('click', this.closeContextMenu)
    }
  }

  private initTags() {
    this.affixTags.forEach(item => item.name && TagsViewModule.addView(item))
  }

  private addTags() {
    const { name } = this.$route
    name && TagsViewModule.addView(this.$route)
  }

  private async refreshSelectedTag(tag: ITagsView) {
    // waitting delete cacheView
    await TagsViewModule.deleteCachedView(tag)
    if (tag.path && this.$route.path !== tag.path) this.$router.replace(tag.path)
  }

  private openBlankSelectedTag(tag: ITagsView) {
    const { fullPath, name, meta } = tag
    if (fullPath && name) {
      ;(!meta || !meta.affix) && TagsViewModule.deleteView(tag)
      const { href } = this.$router.resolve({ path: fullPath })
      //waitting fade animation compelete
      setTimeout(() => {
        window.open(href, '_blank')
      }, 300)
    }
  }

  private closeSelectedTag(tag: ITagsView) {
    const index = this.visitedViews.findIndex(item => item.name === tag.name)
    TagsViewModule.deleteView(tag)
    this.changeView(index === this.visitedViews.length - 1 ? index : index - 1)
  }

  private changeView(index: number) {
    if (this.visitedViews[index].fullPath && this.visitedViews[index].name) {
      this.$router.push(this.visitedViews[index].fullPath as string)
    }
  }

  // private toNextView(index: number) {
  //   console.log(index)
  //   // console.log(this.visitedViews, tag)
  // }

  // private toPreviousView(index: number) {
  //   console.log(index)
  // }

  private openContextMenu(event: MouseEvent, tag: ITagsView) {
    // console.log(tag, event)
    this.selectedTag = tag
    this.styleObj = {
      ...this.styleObj,
      left: event.pageX + 'px',
      top: event.pageY + 'px'
    }
    this.visible = true
  }
  private closeContextMenu() {
    this.visible = false
  }

  mounted() {
    this.initTags()
    this.addTags()
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  position: relative;
  width: 100%;
  height: 34px;
  padding: 0 10px;
  background-color: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
  }
  .tags-view-item {
    position: relative;
    flex: 0 1 140px;
    min-width: 0;
    height: 28px;
    // line-height: 26px;
    display: inline-flex;
    align-items: center;
    padding: 0 8px;
    font-size: 12px;
    background-color: #fff;
    border: 1px solid #d8dce5;
    border-radius: 4px;
    color: #495060;
    overflow: hidden;
    cursor: pointer;
    & + .tags-view-item {
      margin-left: 5px;
    }
    &.router-link-exact-active {
      background-color: #42b983;
      color: #fff;
      border-color: #42b983;
      .tags-view-icon-wrapper {
        background-image: none;
        background-color: #42b983;
        // color: #666;
      }
    }
  }
  .svg-icon {
    margin-right: 5px;
  }
  .tags-view-title {
    white-space: nowrap;
    outline: none;
    user-select: none;
  }
  .tags-view-icon-wrapper {
    position: absolute;
    top: 5px;
    right: 0;
    width: 32px;
    height: 20px;
    line-height: 16px;
    text-align: center;
    background-color: #fff;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 1) 20%);
    user-select: none;
    .tags-view-icon {
      display: inline-block;
      width: 16px;
      height: 16px;
      margin: 1px auto;
      border-radius: 100%;
      transition: background-color 0.3s;
      &:hover {
        background-color: #e1e4e8cf;
      }
      .el-icon-close {
        transform: scale(0.8);
        font-weight: 700;
      }
    }
  }
  .contextmenu {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
