<template>
  <div class="dashboard-container">
    <el-row class="dashboard-container-elrow">
      <Draggable v-model="numberCardList">
        <el-col v-for="item in numberCardList" :key="item.iconName" :xs="12" :sm="12" :lg="6">
          <el-card shadow="hover">
            <number-card v-bind="item"></number-card>
          </el-card>
        </el-col>
      </Draggable>
      <el-col :span="24">
        <el-card shadow="hover">
          <LineChart height="350px" :options="lineChartOption" />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card shadow="hover">
          <PieChart style="height:300px" :options="pieChartOption" />
        </el-card>
      </el-col>
      <!-- <el-col :xs="24" :sm="24" :lg="12">
        <el-card shadow="hover">
          <div style="height:300px"></div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="16">
        <el-card shadow="hover">111</el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="4">
        <el-card shadow="hover">111</el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="4">
        <el-card shadow="hover">111</el-card>
      </el-col> -->
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Draggable from 'vuedraggable'
import NumberCard from './components/NumberCard.vue'
import LineChart from '@/components/Echarts/LineChart.vue'
import PieChart from '@/components/Echarts/PieChart.vue'
@Component({
  name: 'Dashboard',
  components: {
    Draggable,
    NumberCard,
    LineChart,
    PieChart
  }
})
export default class extends Vue {
  protected numberCardList = [
    {
      iconName: 'peoples',
      iconColor: '#40c9c6',
      title: 'Card Title',
      number: 3600000
    },
    {
      iconName: 'message',
      iconColor: '#36a3f7',
      title: 'Card Title',
      number: 3600000
    },
    {
      iconName: 'money',
      iconColor: '#f4516c',
      title: 'Card Title',
      number: 3600000
    },
    {
      iconName: 'shopping',
      iconColor: '#34bfa3',
      title: 'Card Title',
      number: 3600000
    }
  ]
  protected lineChartOption = {
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      boundaryGap: false,
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
        data: [100, 120, 161, 134, 105, 160, 165],
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
        data: [120, 82, 91, 154, 162, 140, 145],
        animationDuration: 2800,
        animationEasing: 'quadraticOut'
      }
    ]
  }
  protected pieChartOption = {
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
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 10px;
  background-color: #f0f2f5;
  position: relative;
  &-elrow {
    margin: 0 -6px 0 -6px;
    .el-col {
      padding: 6px;
    }
  }
}
</style>
