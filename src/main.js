import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 三方库配置
import '@/settings/elementui'
import '@/settings/axios'

// CSS
// ElementUI
import 'element-ui/lib/theme-chalk/index.css';
// 导入全局样式
import '@/assets/css/global.css'
// 导入icon字体
import '@/assets/fonts/iconfont.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
