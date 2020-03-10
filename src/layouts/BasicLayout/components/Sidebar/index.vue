<template>
  <div class="has-logo">
    <SideBarLogo :isCollapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">111</el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import SideBarLogo from './SideBarLogo.vue'
@Component({
  name: 'SideBar',
  components: {
    SideBarLogo
  }
})
export default class extends Vue {
  get sidebar() {
    return AppModule.sidebar
  }
  get isCollapse() {
    return !this.sidebar.opened
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
