<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script lang="ts">
import { Component, Prop, Watch, Mixins } from 'vue-property-decorator'
import ResizeMixin from './mixins/resize'
import echarts, { EChartOption } from 'echarts'
@Component({
  name: 'PieChart'
})
export default class extends Mixins(ResizeMixin) {
  @Prop({ default: 'chart' }) private className!: string
  @Prop({ default: 'chart' }) private id!: string
  @Prop({ default: '100%' }) private width?: string
  @Prop({ default: '300px' }) private height!: string
  @Prop({ default: () => ({}) }) private options?: EChartOption<EChartOption.SeriesPie>

  private initOptions: EChartOption<EChartOption.SeriesPie> = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      left: 'center',
      bottom: '10',
      data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
    },
    series: [
      {
        name: 'WEEKLY WRITE ARTICLES',
        type: 'pie',
        roseType: 'radius',
        radius: [15, 95],
        center: ['50%', '38%'],
        data: [
          { value: 320, name: 'Industries' },
          { value: 240, name: 'Technology' },
          { value: 149, name: 'Forex' },
          { value: 100, name: 'Gold' },
          { value: 59, name: 'Forecasts' }
        ],
        animationEasing: 'cubicInOut',
        animationDuration: 2600
      }
    ]
  }

  @Watch('options')
  private onOptionsChange(options: EChartOption<EChartOption.SeriesPie>) {
    options && this.initChart()
  }

  private setOptions<T extends EChartOption<EChartOption.SeriesPie>>(options: T): T {
    return Object.assign({}, this.initOptions, options)
  }

  private initChart() {
    this.chart = this.chart ?? echarts.init(this.$el as HTMLDivElement, 'macarons')
    this.chart && this.chart.setOption(this.setOptions(this.options || {}))
  }

  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  }

  beforeDestroy() {
    if (!this.chart) return
    this.chart.dispose()
    this.chart = null
  }
}
</script>

<style lang="scss" scoped></style>
