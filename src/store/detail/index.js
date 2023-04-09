//
import { reqGoodsInfoAPI, reqAddshopCardAPI } from '@/api'
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
  },
  async addORupdateShop({ commit }, { skuId, skuNum }) {
    // 此请求并未返回数据，不需要将数据更新到仓库的操作
    const res = await reqAddshopCardAPI(skuId, skuNum)
    if (res.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(Error('fail'))
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
  },
  skuSaleAttrValueList(state) {
    return state.goodsInfo.skuInfo.skuSaleAttrValueList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
