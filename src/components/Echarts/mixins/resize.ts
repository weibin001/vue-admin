import { ECharts } from 'echarts'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'ResizeMixin'
})
export default class extends Vue {
  protected chart: ECharts | null = null
  protected sidebar: Element | null = null

  protected chartResizeHandler() {
    this.chart && this.chart.resize()
  }

  protected sidebarResizeHandler(e: TransitionEvent) {
    console.log(e)
    e.propertyName === 'width' && this.chartResizeHandler && this.chartResizeHandler()
  }

  private initResizeEvent() {
    this.chartResizeHandler && window.addEventListener('resize', this.chartResizeHandler)
  }

  private destroyResizeEvent() {
    this.chartResizeHandler && window.removeEventListener('resize', this.chartResizeHandler)
  }

  private initSidebarResize() {
    this.sidebar = document.querySelector('.sidebar-container') || null
    this.sidebar && this.sidebar.addEventListener('transitionend', this.sidebarResizeHandler as EventListener)
  }

  private destroySiderbarResize() {
    this.sidebar && this.sidebar.removeEventListener('transitionend', this.sidebarResizeHandler as EventListener)
  }

  mounted() {
    this.initResizeEvent()
    this.initSidebarResize()
  }

  activated() {
    this.initResizeEvent()
    this.initSidebarResize()
  }

  deactivated() {
    this.destroyResizeEvent()
    this.destroySiderbarResize()
  }

  beforeDestroyed() {
    this.destroyResizeEvent()
    this.destroySiderbarResize()
  }
}
