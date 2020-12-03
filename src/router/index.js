import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/dashboard',
    component: resolve => { require(['@/views/main'], resolve) },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        meta: {
          id: 125,
          title: '仪表盘',
        },
        component: resolve => { require(['@/views/Dashboard'], resolve) }
      },
      {
        path: '/user',
        name: 'User',
        meta: {
          id: 125,
          title: '用户'
        },
        redirect: '/user/index',
        children: [
          {
            path: '/user/index',
            name: 'UserIndex',
            meta: {
              id: 125,
              title: '用户信息'
            },
            component: resolve => { require(['@/views/User'], resolve) }
          }
        ]
      },
      {
        path: '/about',
        name: 'About',
        meta: {
          id: 145,
          title: '关于'
        },
        component: resolve => { require(['@/views/About'], resolve) }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: resolve => { require(['@/views/Login'], resolve) }
  }
]

const router = new VueRouter({
  routes
})

export default router
