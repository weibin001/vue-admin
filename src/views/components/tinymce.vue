<template>
  <div class="components-container">
    <Tinymce v-if="tinymce" v-model="content" :height="400" @mounted="onMounted" @imagesUpload="imagesUpload" />
    <div class="editor-content" v-html="content" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Tinymce from '@/components/Tinymce/index.vue'
@Component({
  name: 'TinymceDemo',
  components: {
    Tinymce
  }
})
export default class extends Vue {
  protected content = ''

  protected tinymce = true

  protected onMounted() {
    // console.log('Mounted')
  }

  protected imagesUpload({ success }: { file: any; success: Function; failure: Function }) {
    // console.log(file)
    success(`${process.env.BASE_URL}img/icons/android-chrome-192x192.png`)
  }

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
