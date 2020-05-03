<template>
  <div class="right-panel-container" :class="{ show }">
    <div class="right-panel-background" @click.stop="closeSidebar"></div>
    <div class="right-panel">
      <div class="right-panel-button" @click="show = !show" :style="{ top }">
        <i :class="show ? 'el-icon-close' : 'el-icon-setting'" />
      </div>
      <div class="right-panel-items">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
@Component({
  name: 'RightPanel'
})
export default class extends Vue {
  @Prop({ default: 250 }) private buttonTop?: number | string
  private show = false

  get top() {
    return typeof this.buttonTop === 'number' ? this.buttonTop + 'px' : this.buttonTop
  }

  @Watch('show')
  private onChangeShow(val: boolean) {
    if (val) {
      document.body.classList.add('showRightPanel')
    } else {
      document.body.classList.remove('showRightPanel')
    }
  }

  private closeSidebar() {
    this.show = false
  }
}
</script>

<style lang="scss" scoped>
.right-panel-background {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  background: rgba(0, 0, 0, 0.2);
  z-index: -1;
}
.right-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  max-width: 260px;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  transform: translateX(100%);
  transition: transform 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  background: #fff;
  z-index: 2001;
}
.right-panel-button {
  width: 48px;
  height: 48px;
  position: absolute;
  top: 28%;
  left: -48px;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 0;
  cursor: pointer;
  pointer-events: auto;
  color: #fff;
  line-height: 48px;
  background-color: $menuActiveText;
  i {
    font-size: 24px;
    line-height: 48px;
  }
}

.show {
  .right-panel-background {
    width: 100%;
    height: 100%;
    opacity: 1;
    z-index: 2000;
  }
  .right-panel {
    transform: translate(0);
    z-index: 2001;
  }
}
</style>
