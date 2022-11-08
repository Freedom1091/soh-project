import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 重写 push|replace 方法
// 先保存一份原有的 push|replace 方法
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

// 重写 push
VueRouter.prototype.push = function (location, resolve, reject) {
  // 判断是否有成功或失败的回调
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
// 重写 replace
VueRouter.prototype.replace = function (location, resolve, reject) {
  // 判断是否有成功或失败的回调
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

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
    meta: { isShow: true } // 路由元信息，控制Header与Footer的显示与隐藏
  },
  // 搜索路由
  {
    path: '/search/:keyword?', // 拼接params参数keyword，【?】表示可有可无
    component: () => import('@/views/Search'),
    name: 'search',
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
