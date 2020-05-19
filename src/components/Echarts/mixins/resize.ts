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

  mounted() {
    window.addEventListener('resize', this.chartResizeHandler)
    this.sidebar = document.querySelector('.sidebar-container') || null
    this.sidebar && this.sidebar.addEventListener('transitionend', this.chartResizeHandler)
  }

  beforeDestroyed() {
    window.removeEventListener('resize', this.chartResizeHandler)
    this.sidebar && this.sidebar.removeEventListener('transitionend', this.chartResizeHandler)
  }
}
