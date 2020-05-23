<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script lang="ts">
import { Component, Prop, Watch, Mixins } from 'vue-property-decorator'
import ResizeMixin from './mixins/resize'
import echarts, { EChartOption } from 'echarts'
@Component({
  name: 'LineChart'
})
export default class extends Mixins(ResizeMixin) {
  @Prop({ default: 'chart' }) private className!: string
  @Prop({ default: 'chart' }) private id!: string
  @Prop({ default: '100%' }) private width?: string
  @Prop({ default: '300px' }) private height!: string
  @Prop({ default: () => ({}) }) private options?: EChartOption<EChartOption.SeriesLine>

  // protected chart: echarts.ECharts | null = null
  private initOptions: EChartOption<EChartOption.SeriesLine> = {
    xAxis: {
      data: [],
      boundaryGap: false,
      axisTick: {
        show: false
      }
    },
    grid: {
      left: 10,
      right: 10,
      bottom: 20,
      top: 30,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      padding: 8
    },
    yAxis: {
      axisTick: {
        show: false
      }
    },
    legend: {
      data: ['expected', 'actual']
    },
    series: [
      {
        name: 'expected',
        itemStyle: {
          color: '#FF005A',
          lineStyle: {
            color: '#FF005A',
            width: 2
          }
        },
        smooth: true,
        type: 'line',
        data: [],
        animationDuration: 2800,
        animationEasing: 'cubicInOut'
      },
      {
        name: 'actual',
        smooth: true,
        type: 'line',
        itemStyle: {
          color: '#3888fa',
          lineStyle: {
            color: '#3888fa',
            width: 2
          },
          areaStyle: {
            color: '#f3f8ff'
          }
        },
        data: [],
        animationDuration: 2800,
        animationEasing: 'quadraticOut'
      }
    ]
  }

  @Watch('options')
  private onOptionsChange(options: EChartOption) {
    options && this.initChart()
  }

  private setOptions<T extends EChartOption<EChartOption.SeriesLine>>(options: T): T {
    return Object.assign({}, this.initOptions, options)
  }

  private initChart() {
    this.chart = this.chart || echarts.init(this.$el as HTMLDivElement, 'macarons')
    this.chart.setOption(this.setOptions(this.options || {}))
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
