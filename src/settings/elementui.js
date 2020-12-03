import Vue from 'vue'

import ElementUI, {
  Message,
  Form,
  Button
} from 'element-ui'

Vue.prototype.$message = Message

const Ele = [
  ElementUI, Form, Button
]
Ele.forEach(item => {
  Vue.use(item)
})
