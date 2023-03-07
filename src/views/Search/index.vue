<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--面包屑 bread 区域-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 类名面包屑 -->
            <li class="with-x" v-show="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCate">×</i>
            </li>
            <!-- 关键字面包屑 -->
            <li class="with-x" v-show="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKey">×</i>
            </li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-show="searchParams.trademark">
              {{ searchParams.trademark.split(':')[1] }}
              <i @click="removeTrade">×</i>
            </li>
            <!-- 售卖属性面包屑 -->
            <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index">
              {{ attrValue.split(':')[1] }}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--子组件 selector-->
        <SearchSelector @getTrademark="getTrademark" @getAttrInfo="getAttrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a
                    >综合<span v-show="isOne">{{ isAsc ? '↑' : '↓' }}</span></a
                  >
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a
                    >价格<span v-show="isTwo">{{ isAsc ? '↑' : '↓' }}</span></a
                  >
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品展示区域 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"><img :src="good.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页的地方 -->
          <PagiNation :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @changePageNo="changePageNo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'my-search',
  data() {
    return {
      // 将来Search模块搜索的条件
      searchParams: {
        category1Id: '', // 一级分类的id
        category2Id: '', // 二级分类的id
        category3Id: '', // 三级分类的id
        categoryName: '', // 商品的名字
        keyword: '', // 用户搜索的关键字
        props: [], // 商品属性的搜索条件
        trademark: '', // 品牌的搜索条件
        order: '1:desc', // 排序的参数 【默认初始值:1:desc】
        pageNo: 1, // 当前分页器的页码  【默认初始值:1】
        pageSize: 5 // 代表当前一页显示几条数据 【默认初始值:5】
      }
    }
  },
  components: {
    SearchSelector
  },
  // 钩子函数:beforeCreate、created、beforeMount.执行都是在mounted之前
  // 整理参数不能在：beforeCreate因为不能获取VC属性、方法
  beforeMount() {
    // 商品分类搜索条件
    // this.searchParams.category1Id = this.$route.query.category1Id;
    // this.searchParams.category2Id = this.$route.query.category2Id;
    // this.searchParams.category3Id = this.$route.query.category3Id;
    // this.searchParams.categoryName = this.$route.query.categoryName;
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  // 组件挂载完毕次钩子执行一次,发请求
  mounted() {
    // 在发请求之前:整理用户搜索的参数
    // 组件挂载完毕发一次请求
    this.getData()
    // 获取用户信息
  },
  // 把请求的函数进行封装,将来需要多次请求数据,调用多次函数【函数可以复用】
  methods: {
    // 清空 searchParams 数据方法
    clearSearch() {
      // *优化：将值置为 unfinded，在向服务器发请求时，可以少带一些不必要的数据
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
    },
    // 发请求,获取搜索模块的数据
    getData() {
      // 通知Vuex发请求、仓库存储数据
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    // 点击x -> 删除三级菜单搜索的面包屑并重新请求数据
    removeCate() {
      // 删除 query 里的参数
      this.searchParams.categoryName = undefined
      this.clearSearch()
      this.getData()
      // 用户删除面包屑后若存在params参数，则保留在路由中
      if (this.$route.params) {
        this.$router.push({ name: 'search', params: this.$route.params })
      }
    },
    // 点击x -> 删除关键字搜索的面包屑并重新请求数据
    removeKey() {
      // 删除 params 里的参数
      this.searchParams.keyword = undefined
      this.getData()
      // 用户删除面包屑后若存在query参数，则保留在路由中
      if (this.$route.query) {
        this.$router.push({ name: 'search', query: this.$route.query })
      }
    },
    // 点击x -> 删除品牌名搜索的面包屑并重新请求数据
    removeTrade() {
      // 品牌名赋值为 unfinded 会报错
      this.searchParams.trademark = ''
    },
    // 点击x -> 删除品牌名搜索的面包屑并重新请求数据
    removeAttr(index) {
      this.searchParams.props.splice(index, 1)
      this.getData()
    },
    // 点击 -> 修改 order
    changeOrder(flag) {
      // console.log(flag)
      // 起始 flag('1'代表点击综合,'2'代表点击价格)
      const orginFlag = this.searchParams.order.split(':')[0]
      // 起始 sort(排序)
      const orginSort = this.searchParams.order.split(':')[1]
      // console.log(orginFlag, orginSort)
      // 创建一个新的空 order
      let newOrgin = ''
      if (flag === orginFlag) {
        // 点击的是起始元素（综合）
        newOrgin = `${orginFlag}:${orginSort === 'desc' ? 'asc' : 'desc'}`
      } else {
        // 点击的是其他元素（价格）
        newOrgin = `${flag}:desc`
        // console.log(newOrgin)
      }
      this.searchParams.order = newOrgin
      this.getData()
    },
    // 自定义事件 -> 子组件传递 trademark 的回调
    getTrademark(trademarkList) {
      // 整理字段
      this.searchParams.trademark = `${trademarkList.tmId}:${trademarkList.tmName}`
      this.getData()
    },
    // 自定义事件 -> 子组件传递 attr,attrValue 的回调
    getAttrInfo(attr, attrvalue) {
      // console.log(attr, attrvalue)
      // attrId: 106
      // attrName: "手机系统"
      // attrValueList: Array(2)
      // 整理字段
      const props = `${attr.attrId}:${attrvalue}:${attr.attrName}`
      // 数组去重后,再 push
      if (this.searchParams.props.indexOf(props) === -1) this.searchParams.props.push(props)
      this.getData()
    },
    // 自定义事件 -> 获取 PageNo
    changePageNo(pageNo) {
      // console.log(pageNo)
      this.searchParams.pageNo = pageNo
      this.getData()
    }
  },
  // 计算属性
  computed: {
    ...mapGetters(['goodsList']),
    ...mapState({
      total: state => state.search.searchList.total
    }),
    // 判断排序类名的计算属性
    isOne() {
      return this.searchParams.order.indexOf('1') !== -1
    },
    isTwo() {
      return this.searchParams.order.indexOf('2') !== -1
    },
    isAsc() {
      return this.searchParams.order.indexOf('asc') !== -1
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') !== -1
    }
  },
  // 通过watch监听路由的变化
  watch: {
    // 监听组件VC的$route属性
    // $route，是vue-router提供的
    $route() {
      // 再次整理最新的商品名字参数
      // this.searchParams.category1Id = this.$route.query.category1Id;
      // this.searchParams.category2Id = this.$route.query.category2Id;
      // this.searchParams.category3Id = this.$route.query.category3Id;
      // this.searchParams.categoryName = this.$route.query.categoryName;

      // 先把用户前面存储的1|2|3级别ID清除
      // 发ajax的时候,属性值为undefind,甚至参数K都不携带了【10个搜索条件,可有可无的】
      this.clearSearch()
      // 路由变化整理参数：手机最新的商品名字、商品1|2|3ID
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      // 再次发请求
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: 5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
