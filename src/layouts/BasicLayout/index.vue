<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="classObj.mobile && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <SideBar class="sidebar-container" />
    <div class="main-container hasTagsView">
      <div>
        <Navbar />
        <TagsView />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { AppModule, DeviceType } from '@/store/modules/app'
import ResizeMixin from './mixins/resize'
import { mixins } from 'vue-class-component'
import { SideBar, Navbar, TagsView, AppMain } from './components'
@Component({
  name: 'BasicLayout',
  components: {
    SideBar,
    Navbar,
    TagsView,
    AppMain
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

  public handleClickOutside() {
    AppModule.CloseSideBar(false)
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  width: 100%;
  height: 100%;
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  .main-container {
    position: relative;
    min-height: 100%;
    margin-left: $sideBarWidth;
    transition: margin-left 0.28s;
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
.mobile.app-wrapper {
  .main-container {
    margin-left: 0px;
  }

  .sidebar-container {
    transition: transform 0.28s;
    width: $sideBarWidth !important;
  }

  &.openSidebar {
    position: fixed;
    top: 0;
  }

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transform: translateX(-$sideBarWidth);
    }
  }
  .fixed-header {
    width: 100%;
  }
}
//resize without animation
.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
