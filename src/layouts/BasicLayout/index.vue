<template>
  <div class="app-wrapper" :class="classObj">
    <SideBar class="sidebar-container" />
    <div class="main-container">
      <Navbar />
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { AppModule, DeviceType } from '@/store/modules/app'
import ResizeMixin from './mixins/resize'
import { mixins } from 'vue-class-component'
import { SideBar, Navbar } from './components'
@Component({
  name: 'BasicLayout',
  components: {
    SideBar,
    Navbar
  }
})
export default class extends mixins(ResizeMixin) {
  get classObj() {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation,
      mobile: this.device === DeviceType.Mobile
    }
  }

  get sidebar() {
    return AppModule.sidebar
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  width: 100%;
  height: 100%;
  .main-container {
    position: relative;
    min-height: 100%;
    margin-left: $sideBarWidth;
    transform: margin-left 0.28s;
  }
  .sidebar-container {
    position: fixed;
    width: $sideBarWidth;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    transition: width 0.28s;
  }
  &.hideSidebar {
    .main-container {
      margin-left: $sideBarCollapseWidth;
    }
    .sidebar-container {
      width: $sideBarCollapseWidth;
    }
    .fixed-header {
      width: calc(100% - #{$sideBarCollapseWidth});
    }
  }
}
</style>
