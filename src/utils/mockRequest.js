import axios from 'axios'

export const baseURL = '/mock'

const MyAxios = axios.create({
  baseURL: baseURL,
  // 请求时间不能超过5s
  timeout: 5000
})

// 定义请求拦截器
MyAxios.interceptors.request.use(config => {
  return config
})

// 定义响应拦截器
MyAxios.interceptors.response.use(
  res => {
    // 为请求头挂载 Authorization 字段
    // 成功的回调
    return res.data
  },
  err => {
    // 失败的回调
    return Promise.reject(err)
  }
)

export default MyAxios
