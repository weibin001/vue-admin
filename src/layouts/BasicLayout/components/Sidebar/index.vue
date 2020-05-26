<template>
  <div :class="{ 'has-logo': showSidebarLogo === '1' }">
    <SidebarLogo v-if="showSidebarLogo === '1'" :isCollapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper" :noresize="true">
      <el-menu
        ref="el-menu"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="menuActiveTextColor"
        :collapse-transition="false"
      >
        <SidebarItem
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-first-level="true"
          :isCollapse="isCollapse"
        ></SidebarItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import { SettingsModule } from '@/store/modules/settings'
import { PermissionModule } from '@/store/modules/permission'
import SidebarLogo from './SidebarLogo.vue'
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/_variables.scss'
@Component({
  name: 'SideBar',
  components: {
    SidebarLogo,
    SidebarItem
  }
})
export default class extends Vue {
  private activeMenus: string[] = []
  private get sidebar() {
    return AppModule.sidebar
  }
  private get isCollapse(): boolean {
    return !this.sidebar.opened
  }
  private get activeMenu(): string {
    const { meta, path } = this.$route
    return meta.activeMenu || path
  }
  private get showSidebarLogo() {
    return SettingsModule.showSidebarLogo
  }
  private get menuActiveTextColor() {
    return SettingsModule.sidebarTextTheme === '0' ? variables.menuActiveText : SettingsModule.theme
  }
  private get variables() {
    return variables
  }
  private get routes() {
    return PermissionModule.dynamicRoutes
  }
}
</script>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
  ::v-deep {
    .scrollbar-wrapper {
      height: 100%;
      overflow-x: hidden;
    }
    .el-scrollbar__view {
      height: 100%;
    }
    .el-scrollbar__bar {
      &.is-vertical {
        right: 0px;
      }

      &.is-horizontal {
        display: none;
      }
    }
  }
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - #{$navbarHeight});
  }
}

.el-menu {
  border: none;
  width: 100% !important;
  height: 100%;
}
</style>
