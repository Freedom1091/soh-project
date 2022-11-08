import request from '@/utils/request'

/* 三级联动接口
  @param {*} param0 { username: 用户名, password: 密码 }
  @returns Promise对象
 */
export const reqCategoyrListAPI = () => {
  return request({
    url: '/product/getBaseCategoryList',
    method: 'GET'
  })
}
