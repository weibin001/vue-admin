<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
        <a v-if="$route.path !== item.path" @click="handleLink(item)">{{ $t('route.' + item.meta.title) }}</a>
        <span class="no-redirect" v-else>{{ $t('route.' + item.meta.title) }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { RouteRecord, Route } from 'vue-router'
@Component({
  name: 'Breadcrumb'
})
export default class extends Vue {
  private breadcrumbs: RouteRecord[] = []
  private defaultBreadcrumb = { path: '/dashboard', meta: { title: 'dashboard' } } as RouteRecord

  @Watch('$route')
  onRouteChange(route: Route) {
    if (route.path.startsWith('/redirect/')) return false
    this.getBreadcrumbs()
  }

  private getBreadcrumbs() {
    const matched = this.$route.matched.filter(item => item.meta && item.meta.title)
    if (matched.length === 0) this.breadcrumbs = [this.defaultBreadcrumb]
    else {
      const { name } = matched[0]
      this.breadcrumbs = name === 'Dashboard' ? matched : [this.defaultBreadcrumb, ...matched]
    }
  }

  private handleLink(item: RouteRecord) {
    const { name, redirect } = item
    redirect && typeof redirect === 'string' ? this.$router.push(redirect) : this.$router.push({ name })
  }

  created() {
    this.getBreadcrumbs()
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: $navbarHeight;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
