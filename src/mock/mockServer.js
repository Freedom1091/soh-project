// 引入mockJS模块
import Mock from 'mockjs'
// 把 JSON 数据引进来
// webpack默认对外暴露【图片、JSON数据】
import banner from './banner.json'
import floor from './floor.json'

// 模拟数据
// 两个参数（参数请求地址，请求数据）
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })
