<template>
  <div class="app-wrapper" :class="classObj"></div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
  name: 'BasicLayout'
})
export default class BasicLayout extends Vue {
  get classObj() {
    return {
      // hideSidebar:this.siderBarOpen,
    }
  }
}
</script>

<style lang="scss" scoped></style>
