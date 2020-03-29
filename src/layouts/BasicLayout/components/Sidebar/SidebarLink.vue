<template>
  <a v-if="isExternal(to)" :href="to" target="_blank"> <slot /> </a>
  <router-link v-else :to="to" linkActiveClass><slot /> </router-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { isExternal } from '@/utils/validate'
@Component({
  name: 'SidebarLink'
})
export default class extends Vue {
  @Prop({ required: true }) readonly to!: string
  private isExternal = isExternal
}
</script>

<style lang="scss" scoped></style>
