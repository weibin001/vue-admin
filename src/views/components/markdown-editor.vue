<template>
  <div class="components-container">
    <markdown-editor ref="markdownEditor" v-model="content" height="300px" :language="language" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import MarkdownEditor from '@/components/Markdown/index.vue'
@Component({
  name: 'MarkdownDemo',
  components: {
    MarkdownEditor
  }
})
export default class extends Vue {
  private content = ''
  private html = ''

  private languageTypeList: { [key: string]: string } = {
    en: 'en_US',
    zh: 'zh_CN'
  }

  get language() {
    return this.languageTypeList[AppModule.language]
  }
}
</script>

<style lang="scss" scoped></style>
