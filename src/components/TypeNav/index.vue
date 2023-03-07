<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="showTypeNav">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <div class="sort" v-show="show">
          <!-- 一级分类 -->
          <!-- 利用事件委派+编程式路由 -->
          <div class="all-sort-list2" @click="goSearch">
            <div class="item bo" v-for="(item, index) in categoryList" :key="item.categoryId" :class="{ curr: currentIndex == index }">
              <h3 @mouseenter="changeIndex(index)">
                <a :data-categoryName="item.categoryName" :data-category1Id="item.categoryId">{{ item.categoryName }}</a>
              </h3>
              <!-- 二，三级分类 -->
              <div class="item-list clearfix" :style="{ display: currentIndex == index ? 'block' : 'none' }">
                <div class="subitem" v-for="item1 in item.categoryChild" :key="item1.categoryId">
                  <dl class="fore">
                    <dt>
                      <a :data-categoryName="item1.categoryName" :data-category2Id="item1.categoryId">{{ item1.categoryName }}</a>
                    </dt>
                    <dd>
                      <em v-for="item2 in item1.categoryChild" :key="item2.categoryId">
                        <a :data-categoryName="item2.categoryName" :data-category3Id="item2.categoryId">{{ item2.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入 lodash 来使用节流
// 节流：在规定时间间隔内不会重复触发回调，频繁触发->少量触发
import throttle from 'lodash/throttle'

export default {
  name: 'TypeNav',
  // 数据
  data() {
    return {
      currentIndex: -1,
      show: true
    }
  },
  // 生命周期勾子
  mounted() {
    // 路由到其他页面时会触发一次生命周期钩子
    // 若不在 home 页面，则隐藏菜单栏
    if (this.$route.path !== '/home') {
      this.show = false
    }
  },
  // 计算属性
  computed: {
    ...mapState({
      categoryList: state => {
        return state.home.categoryList
      }
    })
  },
  // 事件
  methods: {
    // 鼠标进入：为其元素添加背景色(ES5 语法)
    changeIndex: throttle(function (index) {
      // 用户操作过快可能导致卡顿现象
      // 利用节流来消除卡顿
      this.currentIndex = index
    }, 50),
    // 鼠标移出：背景色消失，除主页外菜单栏隐藏
    leaveIndex() {
      this.currentIndex = -1
      if (this.$route.path !== '/home') {
        this.show = false
      }
    },
    // 鼠标点击：三级联动路由跳转
    goSearch(event) {
      // 利用事件委派 + 编程式路由实现路由跳转
      const Element = event.target
      // console.log(Element) // 打印出所点击的标签
      // 节点的dataset属性：可以获取节点的属性与属性值
      /* console.log(Element.dataset)
      // DOMStringMap{v-18b3c0cc: '', categoryname: '图书、音像、电子书刊'}
      // categoryname: "图书、音像、电子书刊" */
      // 解构出Element.dataset中的各自定义属性
      const { categoryname, category1id, category2id, category3id } = Element.dataset
      if (categoryname) {
        // 1. 若存在自定义属性，则证明点击的是 a 标签
        // 2. 整理各级 A 标签的参数
        const locations = { name: 'search', query: { categoryName: categoryname } }
        // 判断是几级分类的 a 标签
        if (category1id) {
          // 动态添加query
          locations.query.category1Id = category1id
        } else if (category2id) {
          locations.query.category2Id = category2id
        } else {
          locations.query.category3Id = category3id
        }
        // console.log(locations)
        // 路由跳转
        // 判断此时是否有 params 参数（点搜索按钮），有则携带
        if (this.$route.params.keyword) {
          locations.params = this.$route.params
        }
        // 目前商品分类这里携带参数只有query参数
        this.$router.push(locations)
      }
    },
    // 鼠标进入：菜单栏显示
    showTypeNav() {
      this.show = true
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // 用样式实现二三级分类的隐藏与显式
          /* &:hover {
            .item-list {
              display: block;
            }
          } */
        }
        // 样式实现鼠标移动添加背景色功能
        /* .item:hover {
          background-color: skyblue;
        } */
        .curr {
          background: skyblue;
        }
      }
    }
  }
}
</style>
