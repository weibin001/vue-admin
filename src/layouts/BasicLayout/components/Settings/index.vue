<template>
  <right-panel>
    <div class="settings-container">
      <h3 class="settings-title">
        系统布局配置
      </h3>
      <div class="settings-item">
        <span class="settings-label">主题色</span>
        <ElColorPicker v-model="theme" size="small" />
      </div>
      <div class="settings-item">
        <span class="settings-label">显示 Tags-View</span>
        <ElSwitch v-model="showTagsView" class="settings-switch" />
      </div>
      <div class="settings-item">
        <span class="settings-label">显示侧边栏 Logo</span>
        <ElSwitch v-model="showSidebarLogo" class="settings-switch" />
      </div>
      <div class="settings-item">
        <span class="settings-label">固定 Header</span>
        <ElSwitch v-model="fixedHeader" class="settings-switch" />
      </div>
      <div class="settings-item">
        <span class="settings-label">侧边栏文字主题色</span>
        <ElSwitch v-model="sidebarTextTheme" class="settings-switch" />
      </div>
    </div>
  </right-panel>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import RightPanel from '@/components/RightPanel/index.vue'
import { SettingsModule } from '@/store/modules/settings'
import { changeThemeColor } from '@/utils/themeColorClient'
@Component({
  name: 'Settings',
  components: {
    RightPanel
  }
})
export default class extends Vue {
  private get theme() {
    return SettingsModule.theme
  }
  private set theme(value) {
    this.onThemeChange(value)
  }

  private get showTagsView() {
    return SettingsModule.showTagsView
  }
  private set showTagsView(value) {
    SettingsModule.changeSetting({ key: 'showTagsView', value })
  }

  private get showSidebarLogo() {
    return SettingsModule.showSidebarLogo
  }
  private set showSidebarLogo(value) {
    SettingsModule.changeSetting({ key: 'showSidebarLogo', value })
  }

  private get fixedHeader() {
    return SettingsModule.fixedHeader
  }
  private set fixedHeader(value) {
    SettingsModule.changeSetting({ key: 'fixedHeader', value })
  }

  private get sidebarTextTheme() {
    return SettingsModule.sidebarTextTheme
  }
  private set sidebarTextTheme(value) {
    SettingsModule.changeSetting({ key: 'sidebarTextTheme', value })
  }

  private async onThemeChange(val: string) {
    await changeThemeColor(val)
    SettingsModule.changeSetting({ key: 'theme', value: val })
    this.$message.success('主题色切换成功~')
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
