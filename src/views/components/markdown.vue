<template>
  <div class="components-container">
    TODO
    <!-- <div class="editor-content" v-html="html" /> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
  name: 'MarkdownDemo'
})
export default class extends Vue {
  private html = ''
}
</script>

<style lang="scss" scoped></style>
