<template>
  <div @click="$router.push({ name: 'ArticleDetail', params: { id: 1 } })">article-list</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
  name: 'ArticleList'
})
export default class extends Vue {}
</script>

<style lang="scss" scoped></style>
