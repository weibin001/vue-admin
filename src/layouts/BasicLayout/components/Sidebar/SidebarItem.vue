<script lang="tsx">
import path from 'path'
import { Vue, Component, Prop } from 'vue-property-decorator'
import SidebarLink from './SidebarLink.vue'
import { isExternal } from '@/utils/validate'
@Component({
  name: 'SidebarItem',
  components: {
    SidebarLink
  }
})
export default class extends Vue {
  @Prop({ required: true }) readonly item: any
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

  render() {
    return this.item.meta && !this.item.meta.hidden ? (
      <div class={[this.isCollapse ? 'collapse-mode' : 'expand-mode', { 'first-level': this.isFirstLevel }]}>
        {this.item.children.length > 0 ? (
          <el-submenu index={this.resolvePath(this.item.path)}>
            <template slot="title">
              {this.item.icon && <svg-icon name={this.item.icon} />}
              <span class="el-submenu--title" slot="title">
                {this.item.title}
              </span>
            </template>
            {this.item.children.map((childrenItem: any) => (
              <sidebar-item
                key={childrenItem.path}
                item={childrenItem}
                basePath={this.resolvePath(this.item.path)}></sidebar-item>
            ))}
          </el-submenu>
        ) : (
          <sidebar-link to={this.isExternal(this.item.path) ? this.item.path : this.resolvePath(this.item.path)}>
            <el-menu-item
              class={{ 'submenu-title-noDropdown': this.isFirstLevel }}
              index={this.resolvePath(this.item.path)}>
              {this.item.icon ? <svg-icon name={this.item.icon} /> : ''}
              <span slot="title"> {this.item.title}</span>
            </el-menu-item>
          </sidebar-link>
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
  margin-right: 16px;
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
