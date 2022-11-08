import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入三级联动组件，注册为全局组件
import TypeNav from '@/views/Home/TypeNav'

// 参数（全局组件名字，哪一个组件）
Vue.component(TypeNav.name, TypeNav)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
