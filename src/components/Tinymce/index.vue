<template>
  <div :class="{ fullscreen: fullscreen }" class="tinymce-container" :style="{ width: containerWidth }">
    <tinymce-editor v-model="tinymceContent" :init="initOptions" />
  </div>
</template>

<script lang="ts">
import 'tinymce/tinymce'
import 'tinymce/themes/silver/theme' // Import themes
import 'tinymce/themes/mobile'
import 'tinymce/icons/default/icons'
import 'tinymce/plugins/advlist' // Any plugins you want to use has to be imported
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/image'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/noneditable'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/print'
import 'tinymce/plugins/save'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/tabfocus'
import 'tinymce/plugins/table'
import 'tinymce/plugins/template'
import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/wordcount'
import TinymceEditor from '@tinymce/tinymce-vue'
import { plugins, toolbar } from './config'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
@Component({
  name: 'Tinymce',
  components: {
    TinymceEditor
  }
})
export default class extends Vue {
  @Prop({ required: true }) private value!: string
  @Prop({ default: 'vue-tinymce' }) private id!: string
  @Prop({ default: () => [] }) private toolbar!: string[]
  @Prop({ default: 'file edit insert view format table' }) private menubar!: string
  @Prop({ default: '360px' }) private height!: string | number
  @Prop({ default: 'auto' }) private width?: string | number = 'auto'
  // @Prop()
  private fullscreen = false

  get tinymceContent() {
    return this.value
  }
  set tinymceContent(value) {
    this.$emit('input', value)
  }

  get containerWidth() {
    return typeof this.width === 'number' ? `${this.width}px` : this.width
  }

  get language() {
    return AppModule.language
  }

  get initOptions() {
    /* eslint-disable @typescript-eslint/camelcase */
    return {
      id: this.id,
      height: this.height,
      body_class: 'panel-body',
      object_resizing: false, //调整大小控件开关
      branding: false, //去除右下角的'由tinymce驱动
      browser_spellcheck: true,
      toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
      menubar: this.menubar, //配置菜单栏是否启用的项目和显示的顺序
      plugins: plugins,
      // icons: 'custom',
      language: this.language === 'zh' ? `${this.language}_CN` : this.language,
      language_url: this.language === 'en' ? '' : `${process.env.BASE_URL}tinymce/langs/${this.language}_CN.js`,
      skin_url: `${process.env.BASE_URL}tinymce/skins/`,
      content_css: '',
      emoticons_database_url: `${process.env.BASE_URL}tinymce/emojis.min.js`,
      custom_undo_redo_levels: 10,
      end_container_on_empty_block: true,
      powerpaste_word_import: 'clean',
      code_dialog_height: 450,
      code_dialog_width: 1000,
      advlist_bullet_styles: 'square',
      advlist_number_styles: 'default',
      nonbreaking_force_tab: true,
      convert_urls: false,
      imagetools_cors_hosts: [],
      images_upload_handler: (blobInfo: any, success: Function, failure: Function) => {
        const file = blobInfo.blob()
        this.$emit('imagesUpload', { file, success, failure })
      },
      init_instance_callback: (editor: any) => {
        if (this.value) editor.setContent(this.value)
        this.$emit('mounted')
      }
    }
  }

  @Watch('language')
  private onLanguageChange() {
    const tinymceManager = (window as any).tinymce
    const tinymceInstance = tinymceManager.get(this.id)
    // if (this.fullscreen) {
    //   tinymceInstance.execCommand('mceFullScreen')
    // }
    if (tinymceInstance) {
      tinymceInstance.destroy()
    }
    this.$nextTick(() => tinymceManager.init(this.initOptions))
  }
}
</script>

<style lang="scss" scoped></style>
