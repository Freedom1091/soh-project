import Vue from 'vue'
import Vuex from 'vuex'

// 引入小仓库
import home from './home'
import search from './search'
import detail from './detail'

Vue.use(Vuex)

// 对外暴露一个 store 实例
export default new Vuex.Store({
  // 实现 Vuex 模块式开发存储数据
  modules: {
    home,
    search,
    detail
  }
})
