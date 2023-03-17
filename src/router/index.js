import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

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

const router = new VueRouter({
  routes,
  // 打开商品页面时，滚动到顶部
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  }
})

export default router
