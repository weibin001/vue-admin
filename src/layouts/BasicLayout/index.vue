<template>
  <div class="app-wrapper" :class="classObj">
    <div class="sidebar-container">sidebar</div>
    <div class="main-container">
      <div>header</div>
      <div>main</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { AppModule, DeviceType } from '@/store/modules/app'
import ResizeMixin from './mixins/resize'
import { mixins } from 'vue-class-component'
@Component({
  name: 'BasicLayout'
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
}
</style>
