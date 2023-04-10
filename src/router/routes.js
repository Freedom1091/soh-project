export default [
  // 利用 webpack 提供的 import 函数实现路由懒加载
  // 首页路由
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    meta: { isShow: true } // 路由元信息，控制Header与Footer的显示与隐藏
  },
  // 搜索路由
  {
    path: '/search/:keyword?', // 拼接params参数keyword，【?】表示可有可无
    component: () => import('@/views/Search'),
    name: 'search',
    meta: { isShow: true }
  },
  // 登录路由
  {
    path: '/login',
    component: () => import('@/views/Login'),
    meta: { isShow: false }
  },
  // 注册路由
  {
    path: '/register',
    component: () => import('@/views/Register'),
    meta: { isShow: false }
  },
  // 商品详情路由
  {
    path: '/detail/:skuId',
    component: () => import('@/views/Detail'),
    meta: { isShow: true }
  },
  // 加入购物车成功路由
  {
    path: '/AddCartSuccess',
    name: 'AddCartSuccess',
    component: () => import('@/views/AddCartSuccess'),
    meta: { isShow: true }
  },
  // 购物车页面路由
  {
    path: '/ShopCart',
    name: 'ShopCart',
    component: () => import('@/views/ShopCart'),
    meta: { isShow: true }
  }
]
