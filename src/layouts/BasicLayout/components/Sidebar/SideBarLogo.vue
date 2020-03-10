<template>
  <div class="sidebar-logo-container" :class="{ collapse: isCollapse }">
    <transition name="sidebarLogoFade">
      <router-link v-if="isCollapse" key="collapse" to="/" class="sidebar-logo-link">
        <img src="favicon.ico" class="sidebar-logo" />
      </router-link>
      <router-link v-else key="expand" to="/" class="sidebar-logo-link">
        <img src="favicon.ico" class="sidebar-logo" />
        <h1 class="sidebar-title">
          {{ title }}
        </h1>
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import settings from '@/settings'
@Component({
  name: 'SideBarLogo'
})
export default class extends Vue {
  @Prop({ required: true }) private isCollapse!: boolean
  private title = settings.title
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: $sideBarLogoHeight;
  line-height: $sideBarLogoHeight;
  background: $sideBarLogoBg;
  text-align: center;
  overflow: hidden;
  .sidebar-logo-link {
    width: 100%;
    height: 100%;
    .sidebar-logo {
      width: $sideBarLogoHeight * 0.6;
      height: $sideBarLogoHeight * 0.6;
      vertical-align: middle;
      margin-right: 12px;
    }
    .sidebar-title {
      display: inline-block;
      margin: 0;
      color: $sideBarLogoText;
      font-weight: 600;
      line-height: $sideBarLogoHeight;
      font-size: 16px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
