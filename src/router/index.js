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
        redirect: '/user/info',
        component: resolve => { require(['@/views/User'], resolve) },
        children: [
          {
            path: '/user/info',
            name: 'UserInfo',
            meta: {
              id: 125,
              title: '用户信息'
            },
            component: resolve => { require(['@/views/User/info'], resolve) }
          },
          {
            path: '/user/detail/',
            name: 'UserDetail',
            meta: {
              title: '用户详细信息'
            },
            component: resolve => { require(['@/views/User/detail'], resolve) }
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


/**
 * 登陆检测，若未登陆，则跳转至登陆界面
 */
router.beforeEach((to, from, next) => {
  // to:将要访问的
  // from:从哪个路径跳转而来 
  // next() 函数，表示放行, 参数中页面地址时，则强制跳转到指定页面。

  if (to.path === '/login') { return next() }
  else {
    // 获取token，如果没有token,则跳转至登陆页面
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) { return next('/login') }
    else { next() }
  }


})

export default router
