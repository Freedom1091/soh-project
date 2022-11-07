import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 利用 webpack 提供的 import 函数实现路由懒加载
  // 首页路由
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    meta: { isShow: true }
  },
  // 搜索路由
  {
    path: '/search',
    component: () => import('@/views/Search'),
    meta: { isShow: true }
  },
  // 登录路由
  {
    path: '/login',
    component: () => import('@/views/Login'),
    meta: { isShow: false }
  },
  // 注册路由
  {
    path: '/register',
    component: () => import('@/views/Register'),
    meta: { isShow: false }
  }
]

const router = new VueRouter({
  routes
})

export default router
