import { reqCategoyrListAPI } from '@/api'
// home 组件的小仓库
const state = {
  // 三级联动数据列表(数据为数组形式)
  categoryList: []
}
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList.slice(0, 15)
  }
}
const actions = {
  async categoryList({ commit }) {
    const res = await reqCategoyrListAPI()
    if (res.code === 200) {
      commit('CATEGORYLIST', res.data)
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
