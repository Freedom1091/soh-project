import mockRequest from '@/utils/mockRequest'

// mock模拟 home页 轮播图接口
export const reqBannerAPI = () => {
  return mockRequest({
    url: '/banner',
    method: 'GET'
  })
}

// mock 模拟 home页 floor数据
export const reqFloorAPI = () => {
  return mockRequest({
    url: '/floor',
    method: 'GET'
  })
}
