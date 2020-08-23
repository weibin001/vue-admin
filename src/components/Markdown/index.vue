<template>
  <div :id="id" />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import 'codemirror/lib/codemirror.css' // codemirror
import '@toast-ui/editor/dist/toastui-editor.css'
import defaultOptions from './default-options'
import TuiEditor from '@toast-ui/editor'
@Component({
  name: 'Markdown'
})
export default class extends Vue {
  @Prop({ required: true }) private value!: string
  @Prop({ default: () => 'markdown-editor-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '') })
  private id!: string
  @Prop({ default: () => defaultOptions }) private options!: toastui.EditorOptions
  @Prop({ default: 'markdown' }) private mode!: string
  @Prop({ default: '300px' }) private height!: string
  // https://github.com/nhnent/tui.editor/tree/master/src/js/langs
  @Prop({ default: 'en_US' }) private language!: string

  private markdownEditor?: toastui.Editor

  get editorOptions() {
    const options = Object.assign({}, defaultOptions, this.options)
    options.initialEditType = this.mode
    options.height = this.height
    options.language = this.language
    return options
  }
  @Watch('value')
  private onValueChange(value: string, oldValue: string) {
    if (this.markdownEditor) {
      if (value !== oldValue && value !== this.markdownEditor.getMarkdown()) {
        this.markdownEditor.setMarkdown(value)
      }
    }
  }

  @Watch('language')
  private onLanguageChange() {
    this.destroyEditor()
    this.initEditor()
  }

  @Watch('height')
  private onHeightChange(value: string) {
    if (this.markdownEditor) {
      this.markdownEditor.height(value)
    }
  }

  @Watch('mode')
  private onModeChange(value: string) {
    if (this.markdownEditor) {
      this.markdownEditor.changeMode(value)
    }
  }

  mounted() {
    this.initEditor()
  }

  private initEditor() {
    const editorElement = document.getElementById(this.id)
    if (!editorElement) return
    const options = { el: editorElement, ...editorElement }
    this.markdownEditor = new TuiEditor(options)
    if (this.value) {
      this.markdownEditor.setMarkdown(this.value)
    }
    this.markdownEditor.on('change', () => {
      if (this.markdownEditor !== undefined) {
        this.$emit('input', this.markdownEditor.getMarkdown())
      }
    })
  }

  private destroyEditor() {
    if (!this.markdownEditor) return
    this.markdownEditor.off('change')
    this.markdownEditor.remove()
    this.markdownEditor = undefined
  }

  public focus() {
    if (this.markdownEditor) {
      this.markdownEditor.focus()
    }
  }

  public setValue(value: string) {
    if (this.markdownEditor) {
      this.markdownEditor.setMarkdown(value)
    }
  }

  public getMarkdown() {
    if (this.markdownEditor) {
      return this.markdownEditor.getMarkdown()
    }
    return ''
  }

  public setHtml(value: string) {
    if (this.markdownEditor) {
      this.markdownEditor.setHtml(value)
    }
  }

  public getHtml() {
    if (this.markdownEditor) {
      return this.markdownEditor.getHtml()
    }
    return ''
  }
}
</script>

<style lang="scss" scoped></style>
