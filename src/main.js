import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局组件
// 引入三级联动组件，注册为全局组件
import TypeNav from '@/components/TypeNav' // 三级联动菜单
import Carousel from '@/components/Carousel' // 轮播图
import PagiNation from '@/components/Pagination' // 分页器
// 引入模拟数据mockServer模块
import '@/mock/mockServer'
// 引入Swiper的css样式
import 'swiper/css/swiper.css'

// 注册全局组件：参数（全局组件名字，哪一个组件）
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(PagiNation.name, PagiNation)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
