<template>
  <div>
    <el-table v-bind="$attrs" v-on="$listeners" :data="data"><slot /></el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ElTable from './table-expend'

@Component({
  name: 'VirtualTable',
  inheritAttrs: true,
  components: {
    ElTable
  }
})
export default class extends Vue {
  @Prop(Array) protected data: object[] | undefined
  position = { start: 0, end: 0 }
}
</script>
<style lang="scss" scoped></style>
