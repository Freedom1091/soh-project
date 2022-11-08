import axios from 'axios'
// 引入进度条
import nProgress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

export const baseURL = '/api'

const MyAxios = axios.create({
  baseURL: baseURL
})

// 定义请求拦截器
MyAxios.interceptors.request.use(config => {
  // 进度条开始
  nProgress.start()
  return config
})

// 定义响应拦截器
MyAxios.interceptors.response.use(
  res => {
    // 为请求头挂载 Authorization 字段
    // 进度条结束
    nProgress.done()
    // 成功的回调
    return res.data
  },
  err => {
    // 失败的回调
    return Promise.reject(err)
  }
)

export default MyAxios
