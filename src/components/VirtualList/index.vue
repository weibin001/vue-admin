<template>
  <div ref="list" :style="{ height }" class="infinite-list-container" @scroll="handleScroll($event)">
    <div ref="phantom" class="infinite-list-phantom"></div>
    <div ref="content" class="infinite-list" :class="listClass">
      <div class="infinite-list-item" ref="items" :id="item._index" :key="item._index" v-for="item in visibleData">
        <slot ref="slot" :item="item.item" :index="item._index"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
type TPosition = {
  index: number
  top: number
  bottom: number
  height: number
}
@Component({
  name: 'VirtualList'
})
export default class extends Vue {
  @Prop({ type: Array, default: () => [] }) protected listData!: object[]
  @Prop({ type: Number, required: true }) protected estimatedItemSize!: number
  @Prop({ default: 3 }) protected bufferNumber!: number
  @Prop({ default: '100%' }) protected height?: string | number
  @Prop({ default: '' }) protected listClass?: string

  public screenHeight = 0
  public start = 0
  public end = 0
  public positions: TPosition[] = []

  protected get _listData() {
    return this.listData.map((item, index) => ({
      _index: `_${index}`,
      item
    }))
  }
  protected get visibleCount(): number {
    return Math.ceil(this.screenHeight / this.estimatedItemSize)
  }
  protected get visibleData() {
    const start = this.start < this.bufferNumber ? 0 : this.start - this.bufferNumber
    const end = this.end + this.bufferNumber
    return this._listData.slice(start, end)
  }

  @Watch('listData') onListDataChange() {
    this.initPositions()
  }

  protected initPositions() {
    this.positions = this.listData.map((d, index) => ({
      index,
      height: this.estimatedItemSize,
      top: index * this.estimatedItemSize,
      bottom: (index + 1) * this.estimatedItemSize
    }))
    this.updateHeight()
  }
  protected async updateHeight() {
    await this.$nextTick()
    if (!this.$refs.items || !(this.$refs.items as Element[]).length) return

    const height = this.positions[this.positions.length - 1].bottom
    ;(this.$refs.phantom as HTMLElement).style.height = height + 'px'
    //更新真实偏移量
    this.setStartOffset()
  }
  protected binarySearch(list: TPosition[], top: number) {
    let start = 0
    let end = list.length - 1
    let ans = -1
    while (start <= end) {
      const mid = (start + end) >> 1
      const midValue = list[mid].bottom
      if (top === midValue) {
        return mid
      } else if (top > midValue) {
        start = mid + 1
      } else if (top < midValue) {
        if (ans === -1 || ans > mid) {
          ans = mid
        }
        end = end - 1
      }
    }
    return ans
  }
  protected getStartIndex(top: number) {
    return this.binarySearch(this.positions, top)
  }
  protected setStartOffset() {
    let startOffset
    if (this.start > 0) {
      const size =
        this.positions[this.start].top -
        (this.start > this.bufferNumber ? this.positions[this.start - this.bufferNumber].top : 0)
      startOffset = this.positions[this.start - 1].bottom - size
    } else {
      startOffset = 0
    }
    ;(this.$refs.content as HTMLElement).style.cssText = `transform : translateY(${startOffset}px)`
  }
  protected handleScroll() {
    const scrollTop = (this.$refs.list as Element).scrollTop
    this.start = this.getStartIndex(scrollTop)
    this.end = this.start + this.visibleCount
    this.setStartOffset()
    this.$emit('scroll-change', scrollTop)
  }

  private mounted() {
    this.initPositions()
    this.screenHeight = this.$el.clientHeight
    this.start = 0
    this.end = this.start + this.visibleCount
  }
}
</script>
<style lang="scss" scoped>
.infinite-list-container {
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.infinite-list {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}
</style>
