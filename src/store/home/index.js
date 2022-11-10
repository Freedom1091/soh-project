import { reqCategoyrListAPI } from '@/api'
// home 组件的小仓库
const store = {
  // 三级联动数据列表
  categoryList: []
}
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  }
}
const actions = {
  async categoryList(store) {
    const res = await reqCategoyrListAPI()
    if (res.code === 200) {
      store.commit('CATEGORYLIST', res.data)
    }
  }
}
const getters = {}

export default {
  store,
  mutations,
  actions,
  getters
}
