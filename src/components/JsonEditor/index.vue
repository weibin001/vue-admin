<template>
  <div class="json-editor-container">
    <textarea ref="textarea" />
  </div>
</template>

<script lang="ts">
import CodeMirror, { Editor } from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/rubyblue.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'
import { Vue, Component, Prop } from 'vue-property-decorator'

require('script-loader!jsonlint')

@Component({
  name: 'JsonEditor'
})
export default class extends Vue {
  @Prop({ default: '' }) private value!: string

  private jsonEditor?: Editor

  mounted() {
    this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea as HTMLTextAreaElement, {
      lineNumbers: true,
      mode: 'application/json',
      gutters: ['CodeMirror-lint-markers'],
      theme: 'rubyblue',
      lint: true
    })
    this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
    this.jsonEditor.on('change', editor => {
      const value = JSON.parse(editor.getValue())
      this.$emit('changed', value)
      this.$emit('input', value)
    })
  }
}
</script>

<style lang="scss" scoped>
.json-editor-container {
  height: 100%;
  position: relative;
}
</style>
