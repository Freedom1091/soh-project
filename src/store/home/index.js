import { reqCategoyrListAPI } from '@/api'
import { reqBannerAPI, reqFloorAPI } from '@/api/mockIndex'
// home 组件的小仓库
const state = {
  // 三级联动数据列表(数据为数组形式)
  categoryList: [],
  // 轮播图数据列表
  bannerList: [],
  // floor数据
  floorList: []
}
// 唯一可以修改 state 数据的地方
const mutations = {
  // 修改 state 中 categoryList 数据
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList.slice(0, 15)
  },
  // 修改 state 中 bannerList 数据
  BANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  // 修改 state 中 floorList 数据
  FLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}
const actions = {
  // 发请求，获取三级列表数据
  async getCategoryList({ commit }) {
    const res = await reqCategoyrListAPI()
    if (res.code === 200) {
      commit('CATEGORYLIST', res.data)
    }
  },
  // 发请求，获取轮播图数据
  async getBannerList({ commit }) {
    const res = await reqBannerAPI()
    // console.log(res)
    if (res.code === 200) {
      // console.log(res.data)
      // 提交数据到仓库
      commit('BANNERLIST', res.data)
    }
  },
  // 发请求，获取floor数据
  async getFloorList({ commit }) {
    const res = await reqFloorAPI()
    if (res.code === 200) {
      commit('FLOORLIST', res.data)
    }
  }
}
// 计算属性
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
