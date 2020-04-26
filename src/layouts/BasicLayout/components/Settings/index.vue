<template>
  <div></div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { SettingsModule } from '@/store/modules/settings'
@Component({
  name: 'Settings'
})
export default class extends Vue {
  get fixedHeader() {
    return SettingsModule.fixedHeader
  }
}
</script>

<style lang="scss" scoped></style>
