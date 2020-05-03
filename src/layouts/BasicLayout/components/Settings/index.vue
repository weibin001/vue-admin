<template>
  <right-panel>
    <div class="settings-container">
      <h3 class="settings-title">
        系统布局配置
      </h3>
      <div class="settings-item">
        <span class="settings-label">主题色</span>
        <el-color-picker v-model="color1" size="small" @change="onThemeChange"></el-color-picker>
        <!-- <el-switch v-model="showTagsView" class="settings-switch" /> -->
      </div>
    </div>
  </right-panel>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import RightPanel from '@/components/RightPanel/index.vue'
import { SettingsModule } from '@/store/modules/settings'
import { initThemeColor, changeThemeColor } from '@/utils/themeColorClient'
@Component({
  name: 'Settings',
  components: {
    RightPanel
  }
})
export default class extends Vue {
  private color1 = '#409EFF'
  get fixedHeader() {
    return SettingsModule.fixedHeader
  }

  private onThemeChange(val: string) {
    initThemeColor()
    changeThemeColor(val).then(() => this.$message.success('主题色切换成功~'))
  }
}
</script>

<style lang="scss" scoped>
.settings-container {
  padding: 24px;
  font-size: 14px;
  word-wrap: break-word;
  .settings-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    font-weight: bold;
    line-height: 22px;
  }
  .settings-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
    display: flex;
    align-items: center;
  }
  .settings-label {
    flex: 1 1 0;
    min-width: 0;
  }
}
</style>
