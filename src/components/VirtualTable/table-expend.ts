import { Table } from 'element-ui'
import Vue, { ComponentOptions } from 'vue'
import { virtualTableBodyRender } from './virtual-table-body-render'
import { Component, Prop, Watch } from 'vue-property-decorator'
// import tableMixin from './table-mixin'

export interface IVirtualTable extends Table {
  rowHeight: number
  start: number
  end: number
  visibleCount(): number
  virtualBodyHeight(): number
}

export interface ElTableBody extends Vue {
  /** Table */
  table: IVirtualTable

  store: object

  /** Whether table is striped */
  stripe: boolean

  context: object

  rowClassName: string | Function

  rowStyle: object | Function

  fixed: string

  highlight: boolean

  getKeyOfRow(row: object, index: number): void

  isColumnHidden(index: number): void

  getSpan(row: object, column: object, rowIndex: number, columnIndex: number): void

  getRowStyle: Function

  getRowClass: Function

  getCellStyle: Function

  getCellClass: Function

  getColspanRealWidth: Function

  handleCellMouseEnter: Function

  handleCellMouseLeave: Function

  [x: string]: any
}

@Component
class TableMixin extends Vue {
  [x: string]: any
  @Prop({ default: 53 }) protected rowHeight!: number
  @Prop({ default: 3 }) protected excessRows!: number
  public start = 0
  public end = 0
  public innerTop = 0
  public scrollTop = 0
  public scrollLeft = 0
  public binded = false

  protected get visibleCount(): number {
    return Math.ceil(+this.fixedBodyHeight.height.slice(0, -2) / this.rowHeight)
  }
  protected get virtualBodyHeight() {
    const { data } = this.store.states
    return data ? data.length * this.rowHeight : 0
  }

  @Watch('visibleCount', { immediate: true }) onVisibleCount(val: number) {
    if (val <= 0) return
    this.computeScrollToRow(this.scrollTop)
  }
  @Watch('scrollTop', { immediate: true }) onScrollTop(val: number) {
    if (val <= 0) this.scrollTop = 0
    this.computeScrollToRow(val)
  }

  protected bindEvent(action: string) {
    const tableBodyWrapper = this.$el.querySelector('.el-table__body-wrapper')
    if (!tableBodyWrapper) return
    if (!this.binded && action === 'bind') {
      tableBodyWrapper.addEventListener('scroll', this.handleScroll)
      this.binded = true
    } else if (this.binded && action === 'unbind') {
      tableBodyWrapper.removeEventListener('scroll', this.handleScroll)
      this.binded = false
    }
  }
  protected computeScrollToRow(scrollTop: number) {
    const startIndex = Math.floor(scrollTop / this.rowHeight)

    const { start, end } = this.getVisibleRange(startIndex)
    ;(this.$parent as any).position = {
      start: start,
      end: end
    }
    this.start = start
    this.end = end
    this.innerTop = this.start * this.rowHeight
  }
  protected getVisibleRange(expectStart: number) {
    const start = expectStart - this.excessRows
    return {
      start: start >= 0 ? start : 0,
      end: expectStart + this.visibleCount + this.excessRows
    }
  }
  protected handleScroll(e: Event) {
    let { scrollTop } = (e.srcElement as HTMLElement) || (e.target as HTMLElement)
    const { scrollLeft } = (e.srcElement as HTMLElement) || (e.target as HTMLElement)
    const bodyScrollHeight = this.visibleCount * this.rowHeight
    if (this.virtualBodyHeight < scrollTop + bodyScrollHeight) {
      scrollTop = this.virtualBodyHeight - bodyScrollHeight
    }
    this.scrollLeft = scrollLeft
    this.scrollTop = scrollTop
    const obj = { scrollTop: scrollTop < 0 ? 0 : scrollTop, scrollLeft: this.scrollLeft, table: this }
    this.$emit('tableBodyScroll', obj, e)
  }

  mounted() {
    ;(this.$parent as any).tableStore = this.store
    this.bindEvent('bind')
  }
  activated() {
    this.bindEvent('bind')
    if (this.scrollTop || this.scrollLeft) {
      setTimeout(() => {
        this.pagingScrollTop(this.scrollTop, this.scrollLeft)
      })
    }
  }
  deactivated() {
    this.bindEvent('unbind')
  }
  beforeDestroy() {
    this.bindEvent('unbind')
  }
}

const ElTable = Table as ComponentOptions<IVirtualTable>
if (!ElTable.mixins) {
  ElTable.mixins = []
}
!ElTable.mixins.includes(TableMixin) && ElTable.mixins.push(TableMixin)
if (ElTable.components) {
  const ElTableBody = ElTable.components.TableBody as ComponentOptions<ElTableBody>
  const oldDataComputed = ElTableBody.computed?.data
  ElTableBody.computed &&
    (ElTableBody.computed.data = function() {
      const { table } = this
      const tableData: object[] = (oldDataComputed as () => object[]).call(this)
      return tableData.slice((table as IVirtualTable).start, (table as IVirtualTable).end)
    })
  ElTableBody.methods &&
    (ElTableBody.methods.getIndex = function(index: number) {
      return this.table.start + index
    })

  // const oldRender = ElTableBody.render
  ElTableBody.render = function(h: Function) {
    return virtualTableBodyRender.call(this, h)
  }
  ElTable.components.TableBody = ElTableBody
}

export default ElTable
