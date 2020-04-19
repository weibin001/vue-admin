<script lang="tsx">
import path from 'path'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { RouteConfig } from 'vue-router'
import SidebarLink from './SidebarLink.vue'
import { isExternal } from '@/utils/validate'
@Component({
  name: 'SidebarItem',
  components: {
    SidebarLink
  }
})
export default class extends Vue {
  @Prop({ required: true }) readonly item!: RouteConfig
  @Prop({ default: false }) readonly isCollapse?: boolean
  @Prop({ default: '' }) readonly basePath!: string
  @Prop({ default: false }) readonly isFirstLevel!: boolean

  private isExternal = isExternal

  private resolvePath(routePath: string): string {
    return (
      (this.isExternal(routePath) && routePath) ||
      (this.isExternal(this.basePath) && this.basePath) ||
      path.resolve(this.basePath, routePath)
    )
  }
  //是否显示子级菜单
  private get alwaysShowRootMenu(): boolean {
    const { meta } = this.item
    return meta && meta.alwaysShow
  }
  // 获取满足条件子菜单数量
  private get showChildNumber(): number {
    const { children } = this.item
    if (children) {
      return this.getChild(children).length
    }
    return 0
  }
  // 获取子菜单（当子级菜单只有一个或满足条件只有一个时
  private get theOnlyOneChild() {
    if (this.showChildNumber > 1) return null
    if (this.item.children) {
      const [child]: RouteConfig[] = this.getChild(this.item.children)
      if (child) {
        return child.children && this.getChild(child.children).length ? null : child
      }
    }
    return { ...this.item, path: '' }
  }
  // 过滤菜单
  public getChild(menu: RouteConfig[]) {
    const childMenu = menu.filter(item => !item.meta || !item.meta.hidden)
    return childMenu
  }

  render() {
    const { children = [], meta = {} } = this.item
    return !meta.hidden ? (
      <div class={[this.isCollapse ? 'collapse-mode' : 'expand-mode', { 'first-level': this.isFirstLevel }]}>
        {!this.alwaysShowRootMenu && this.theOnlyOneChild ? (
          <sidebar-link
            to={
              this.isExternal(this.theOnlyOneChild.path)
                ? this.theOnlyOneChild.path
                : this.resolvePath(this.theOnlyOneChild.path)
            }>
            <el-menu-item
              class={{ 'submenu-title-noDropdown': this.isFirstLevel }}
              index={this.resolvePath(this.theOnlyOneChild.path)}>
              {this.theOnlyOneChild.meta.icon ? <svg-icon name={this.theOnlyOneChild.meta.icon} /> : ''}
              <span slot="title">{this.theOnlyOneChild.meta.title}</span>
            </el-menu-item>
          </sidebar-link>
        ) : (
          <el-submenu index={this.resolvePath(this.item.path)}>
            <template slot="title">
              {meta.icon && <svg-icon name={meta.icon} />}
              <span class="el-submenu--title" slot="title">
                {meta.title}
              </span>
            </template>
            {children.map((childrenItem: any) => (
              <sidebar-item
                key={childrenItem.path}
                item={childrenItem}
                basePath={this.resolvePath(childrenItem.path)}></sidebar-item>
            ))}
          </el-submenu>
        )}
      </div>
    ) : (
      ''
    )
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  margin-right: 8px;
}
.el-submenu.is-active ::v-deep > .el-submenu__title {
  color: $subMenuActiveText !important;
}
.collapse-mode {
  .svg-icon {
    margin-left: 20px;
  }
  &.first-level ::v-deep {
    .el-menu-item.submenu-title-noDropdown > .el-tooltip {
      padding: 0 !important;
    }
    .el-submenu {
      overflow: hidden;
      > .el-submenu__title {
        padding: 0px !important;

        .el-submenu__icon-arrow {
          display: none;
        }

        > .el-submenu--title {
          visibility: hidden;
        }
      }
    }
  }
}
</style>
