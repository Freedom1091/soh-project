import request from '@/utils/request'

/* 三级联动接口
  @param {*} param0 { }
  @returns Promise对象
 */
export const reqCategoyrListAPI = () => {
  return request({
    url: '/product/getBaseCategoryList',
    method: 'GET'
  })
}

/* 搜索数据接口
  @param {*} param0 { }
  @returns Promise对象
 */
export const reqSearchListAPI = params => {
  return request({
    url: '/list',
    method: 'POST',
    data: params
  })
}

/* 商品详情接口
  @param {*} param0 { }
  @returns Promise对象
 */
export const reqGoodsInfoAPI = skuId => {
  return request({
    url: `/item/${skuId}`,
    method: 'GET'
  })
}

export const reqAddshopCardAPI = (skuId, skuNum) => {
  return request({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'POST'
  })
}
