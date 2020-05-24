<template>
  <div class="components-container">
    <div class="editor-container">
      <json-editor ref="jsonEditor" v-model="value" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import JsonEditor from '@/components/JsonEditor/index.vue'
@Component({
  name: 'JsonEditorDemo',
  components: {
    JsonEditor
  }
})
export default class extends Vue {
  private value = [
    {
      items: [
        { marketType: 'forexdata', symbol: 'XAUUSD' },
        { marketType: 'forexdata', symbol: 'UKOIL' },
        { marketType: 'forexdata', symbol: 'CORN' }
      ],
      name: ''
    },
    {
      items: [
        { marketType: 'forexdata', symbol: 'XAUUSD' },
        { marketType: 'forexdata', symbol: 'XAGUSD' },
        { marketType: 'forexdata', symbol: 'AUTD' },
        { marketType: 'forexdata', symbol: 'AGTD' }
      ],
      name: '贵金属'
    },
    {
      items: [
        { marketType: 'forexdata', symbol: 'CORN' },
        { marketType: 'forexdata', symbol: 'WHEAT' },
        { marketType: 'forexdata', symbol: 'SOYBEAN' },
        { marketType: 'forexdata', symbol: 'SUGAR' }
      ],
      name: '农产品'
    },
    {
      items: [
        { marketType: 'forexdata', symbol: 'UKOIL' },
        { marketType: 'forexdata', symbol: 'USOIL' },
        { marketType: 'forexdata', symbol: 'NGAS' }
      ],
      name: '能源化工'
    }
  ]
}
</script>

<style lang="scss" scoped></style>
