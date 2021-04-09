import Vue from 'vue'
import axios from 'axios'


// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.defaults.baseURL = 'http://127.0.0.1:3001/'
// axios.defaults.baseURL = 'http://47.103.144.215:3002/'
  // axios请求拦截器 (预处理)
  axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    // window.console.log(config)
    return config
  })

  
Vue.prototype.$http = axios