import { reqSearchListAPI } from '@/api'
// search 组件的小仓库
const state = {
  // 搜索数据
  searchList: {}
}
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}
const actions = {
  async getSearchList({ commit }, searchParams) {
    const res = await reqSearchListAPI(searchParams)
    // console.log(res)
    if (res.code === 200) {
      // console.log(12321321)
      commit('GETSEARCHLIST', res.data)
    }
  }
}
// 计算属性：简化仓库数据
const getters = {
  goodsList(state) {
    // *||[] : 防止没有网络返回undefined
    return state.searchList.goodsList
  },
  // 品牌的数据
  trademarkList(state) {
    return state.searchList.trademarkList
  },
  // 商品属性
  attrsList(state) {
    return state.searchList.attrsList
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
