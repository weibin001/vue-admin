<template>
  <div class="app-wrapper" :class="classObj">{{ sidebar }}</div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import ResizeMixin from './mixins/resize'
import { mixins } from 'vue-class-component'
@Component({
  name: 'BasicLayout'
})
export default class extends mixins(ResizeMixin) {
  get classObj() {
    return {
      // hideSidebar:this.siderBarOpen,
    }
  }

  get sidebar() {
    return AppModule.sidebar
  }
}
</script>

<style lang="scss" scoped></style>
