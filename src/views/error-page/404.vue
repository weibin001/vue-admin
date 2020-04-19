<template>
  <div class="app-container error-container">404</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
  name: 'Page404'
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.error-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
