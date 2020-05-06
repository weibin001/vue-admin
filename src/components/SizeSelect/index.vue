<template>
  <el-dropdown @command="handleCommand">
    <div>
      <svg-icon class="size-icon" name="size" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="{ label, value } in sizeOptions"
        :key="value"
        :command="value"
        :disabled="size === value"
      >
        {{ label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
// import { TagsViewModule } from '@/store/modules/tags-view'
// import { SettingsModule } from '@/store/modules/settings'
import { settings } from '@/settings'
@Component({ name: 'SizeSelect' })
export default class extends Vue {
  private sizeOptions = [
    { label: 'Default', value: 'default' },
    { label: 'Medium', value: 'medium' },
    { label: 'Small', value: 'small' },
    { label: 'Mini', value: 'mini' }
  ]

  private get size() {
    return AppModule.size
  }

  private get showTagsView() {
    return settings.showTagsView
  }

  private handleCommand(size: string) {
    this.$confirm('此操作将重置标签页, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      callback: actions => {
        if (actions === 'confirm') {
          AppModule.ToggleSize(size)
          location.reload()
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped></style>
