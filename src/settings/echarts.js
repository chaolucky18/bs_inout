import Vue from 'vue'
import * as Echarts from 'echarts'

// 初始化方法，返回echart对象
function chartInit(id) {
  let myChart = Echarts.init(document.querySelector(id))
  return myChart
}

// 初始化并且生成数据
function chart(id, options) {
  chartInit(id).setOption(options)
}

Vue.prototype.$chartInit = chartInit
Vue.prototype.$chart = chart
// Object.defineProperty(Vue.prototype, {
//   $chartInit: charts
// })