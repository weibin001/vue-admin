<template>
  <section class="article-list">
    <VirtualList
      class="article-list__container"
      :listData="cacheList"
      :estimatedItemSize="160"
      v-infinite-scroll="handleInfiniteScroll"
      :infinite-scroll-immediate="false"
    >
      <template v-slot="{ item }">
        <el-card class="article-list__item ">{{ item.id }}</el-card>
      </template>
    </VirtualList>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { getArticles } from '@/api/articles'
import { IArticleData } from '@/api/types'
import VirtualList from '@/components/VirtualList/index.vue'
@Component({
  name: 'ArticleList',
  components: { VirtualList }
})
export default class extends Vue {
  [x: string]: any
  @Prop({ default: 160 }) protected rowHeight!: number
  @Prop({ default: 3 }) protected bufferScale!: number

  public isBind = false
  public cacheList: object[] = []
  public listLoading = false
  public isEnd = false
  public total = 0
  public params = {
    page: 1,
    limit: 10,
    importance: '',
    title: '',
    type: '',
    sort: '+id'
  }

  public async getList(type?: string) {
    if (this.listLoading || this.isEnd) return
    this.listLoading = true
    const { data } = await getArticles(this.params)
    if (type === 'load') this.params.page++
    // Just to simulate the time of the request
    setTimeout(() => {
      this.cacheList = [
        ...this.cacheList,
        ...data.items.map((item: IArticleData, index: number) => ({
          ...item,
          editTitle: false,
          originalTitle: item.title,
          top: ((this.cacheList.length || 0) + index) * this.rowHeight,
          bottom: ((this.cacheList.length || 0) + index + 1) * this.rowHeight
        }))
      ]
      this.total = data.total || 0
      this.listLoading = false
      if (data.items.length < this.params.limit) this.isEnd = true
    }, 2 * 1000)
  }

  public handleInfiniteScroll() {
    // console.log(1)
    this.getList('load')
  }
}
</script>

<style lang="scss" scoped>
.hasTagsView .article-list {
  height: calc(100vh - #{$navbarHeight} - #{$tagsHeight});
}
.article-list {
  position: relative;
  padding: 0 20px;
  height: calc(100vh - #{$navbarHeight});
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.article-list__container {
  padding-right: 20px;
  margin-right: -20px;
  ::v-deep .infinite-list {
    right: 20px;
    top: 20px;
    // height: auto;
  }
}

.article-list__item {
  height: 150px;
  margin-bottom: 10px;
}
.article-list__loading,
.article-list__end {
  text-align: center;
  line-height: 26px;
  font-size: 13px;
  color: #999;
}
</style>
