<template>
  <div class="components-container"></div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
  name: 'TinymceDemo'
})
export default class extends Vue {
  protected content = ''

  protected tinymce = true

  activated() {
    this.tinymce = true
  }
  deactivated() {
    this.tinymce = false
  }
}
</script>

<style lang="scss" scoped>
.components-container {
  margin: 30px 50px;
  position: relative;
}
</style>
