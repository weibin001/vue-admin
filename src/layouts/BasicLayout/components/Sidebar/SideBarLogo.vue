<template>
  <div class="sidebar-logo-container" :class="{ collapse: isCollapse }"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
  name: 'SideBarLogo'
})
export default class extends Vue {
  @Prop({ required: true }) private isCollapse!: boolean
}
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
}
</style>
