<template>
  <div :class="{ 'has-logo': showLogo }">
    <SideBarLogo :isCollapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" />
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import settings from '@/settings.ts'
import SideBarLogo from './SideBarLogo.vue'
// import variables from '@/styles/_variables.scss'
@Component({
  name: 'SideBar',
  components: {
    SideBarLogo
  }
})
export default class extends Vue {
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
  private get showLogo(): boolean {
    return settings.showSettings
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
  }
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - $sideBarLogoHeight);
  }
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
