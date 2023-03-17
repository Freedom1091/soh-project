//
import { reqGoodsInfoAPI } from '@/api'
const state = {
  goodsInfo: {}
}
// 唯一可以修改 state 数据的地方
const mutations = {
  GOODSINFO(state, goodsInfo) {
    state.goodsInfo = goodsInfo
  }
}
const actions = {
  async getGoodsInfo({ commit }, skuID) {
    const res = await reqGoodsInfoAPI(skuID)
    if (res.code === 200) {
      // console.log(res.data)
      commit('GOODSINFO', res.data)
    }
  }
}
// 计算属性
const getters = {
  // 初始化时 state.goodsInfo 为空对象，则 categoryView 为 undefinded
  categoryView(state) {
    return state.goodsInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
