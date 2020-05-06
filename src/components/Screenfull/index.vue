<template>
  <el-tooltip :content="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" placement="bottom" effect="light">
    <div>
      <svg-icon :name="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="click" />
    </div>
  </el-tooltip>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import screenfull from 'screenfull'
@Component({
  name: 'Screenfull'
})
export default class extends Vue {
  private isFullscreen = false
  mounted() {
    if (screenfull.isEnabled) {
      screenfull.on('change', this.change)
    }
  }

  beforeDestory() {
    if (screenfull.isEnabled) {
      screenfull.off('change', this.change)
    }
  }

  private change() {
    this.isFullscreen = screenfull.isEnabled
  }

  private click() {
    if (!screenfull.isEnabled) {
      this.$message({
        message: 'you browser can not work',
        type: 'warning'
      })
      return false
    }
    screenfull.toggle()
  }
}
</script>

<style lang="scss" scoped></style>
