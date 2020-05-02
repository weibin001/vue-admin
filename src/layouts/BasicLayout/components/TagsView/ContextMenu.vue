<template>
  <transition name="el-fade-in">
    <ul class="context-menu" v-show="visible" :style="styleObj">
      <slot />
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
  @Prop({ required: true, default: 0 }) left!: number
  @Prop({ required: true, default: 0 }) top!: number
  private init = this.visible

  get styleObj() {
    return {
      left: this.left + 'px',
      top: this.top + 'px'
    }
  }

  @Watch('visible')
  private onVisibleChange(val: boolean) {
    if (val) {
      !this.init && document.body.appendChild(this.$el as HTMLElement)
      document.body.classList.add('el-popup-parent--hidden')
      this.$emit('open')
    } else {
      document.body.classList.remove('el-popup-parent--hidden')
      this.$emit('close')
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
  min-width: 100px;
  background-color: #fff;
  padding: 5px 0;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 2000;
  ::v-deep &-item {
    list-style: none;
    line-height: 24px;
    padding: 0 15px;
    margin: 0;
    font-size: 14px;
    color: #606266;
    white-space: nowrap;
    outline: none;
    user-select: none;
    outline: none;
    &:hover {
      background: #eee;
      transition: background-color 0.3s;
    }
  }
  ::v-deep &-item__disabled {
    color: #ccc;
    cursor: not-allowed;
  }
  ::v-deep .el-divider--horizontal {
    height: 1.5px;
    margin: 5px 0;
  }
}
</style>
