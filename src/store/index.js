import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用来存储登录成功后，得到的 token
    token: ''
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {}
})
