<template>
  <transition name="el-fade-in">
    <ul class="context-menu" v-show="visible" :style="styleObj">
      <li class="context-menu-item">1111</li>
      <li class="context-menu-item">1111</li>
      <el-divider></el-divider>
      <li class="context-menu-item">1111</li>
      <li class="context-menu-item">1111</li>
      <li class="context-menu-item">1111</li>
      <li class="context-menu-item">1111</li>
    </ul>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
@Component({
  name: 'ContextMenu'
})
export default class extends Vue {
  @Prop({ required: true, type: Boolean, default: false }) visible!: boolean
  // @Prop({ type: Boolean }) appendToBody = true
  @Prop({ type: Number }) offsetLeft = 0
  @Prop({ type: Number }) offsetTop = 0
  public init = this.visible
  @Watch('visible')
  onVisibleChange(val: boolean) {
    if (val) {
      !this.init && document.body.appendChild(this.$el as HTMLElement)
      this.$emit('open')
    } else {
      this.$emit('close')
    }
  }

  get styleObj() {
    return {
      left: this.offsetLeft + 'px',
      top: this.offsetTop + 'px'
    }
  }

  mounted() {
    this.init && document.body.appendChild(this.$el)
  }

  destroyed() {
    this.$el && this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
  }
}
</script>

<style lang="scss" scoped>
.context-menu {
  position: absolute;
  width: 160px;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 2000;
  &-item {
    list-style: none;
    line-height: 30px;
    padding: 0 20px;
    margin: 0;
    font-size: 14px;
    color: #606266;
    cursor: pointer;
    outline: none;
  }
}
</style>
