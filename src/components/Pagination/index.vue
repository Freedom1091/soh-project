<template>
  <div class="page">
    <div class="sui-pagination clearfix">
      <ul>
        <li class="prev side" :class="pageNo === 1 ? 'disabled' : 'none'" @click="$emit('changePageNo', pageNo - 1)">
          <a>«上一页</a>
        </li>

        <!-- 头部 -->
        <li :class="{ active: pageNo === 1 }" v-if="StartEndNum.start > 1" @click="$emit('changePageNo', 1)">
          <a href="#">1</a>
        </li>
        <li class="dotted" v-if="StartEndNum.start > 2">
          <span>...</span>
        </li>

        <!-- 中部 -->
        <template v-for="(page, index) in StartEndNum.end">
          <li :class="{ active: page === pageNo }" v-if="page >= StartEndNum.start" :key="index" @click="$emit('changePageNo', page)">
            <a>{{ page }}</a>
          </li>
        </template>

        <!-- w尾部 -->
        <li class="dotted" v-if="StartEndNum.end < totalPage">
          <span v-if="StartEndNum.end <= totalPage - 1">...</span>
        </li>
        <li :class="{ active: pageNo === totalPage }" @click="$emit('changePageNo', totalPage)" v-if="StartEndNum.end <= totalPage - 1">
          <a href="#">{{ totalPage }}</a>
        </li>

        <li class="next side" :class="pageNo === totalPage ? 'disabled' : 'none'" @click="$emit('changePageNo', pageNo + 1)">
          <a href="#">下一页»</a>
        </li>
      </ul>
      <div style="float: left; margin-top: 9px">共&nbsp;{{ totalPage }}&nbsp;页</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PagiNation',
  // 父 Search 传递过来的值
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    totalPage() {
      // 共多少页 = 总数据条数/一页最大显式条数向上取整
      return Math.ceil(this.total / this.pageSize)
    },
    // 起始页与末页计算
    StartEndNum() {
      const { pageNo, continues } = this
      let start = 0
      let end = 0
      // 若总页数-totalPage小于连续展示页数-continues(5)
      if (this.totalPage < continues) {
        start = 0
        end = this.totalPage
      } else {
        // 当前页 8，6 7 8 9 10
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        if (start < 1) {
          // 若当前页<1
          start = 1
          end = continues
        }
        if (end > this.totalPage) {
          // 当前页>总页数时
          // 当前页18, 15 16 17 18 19
          end = this.totalPage
          start = end - continues + 1
        }
      }
      return { start, end }
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.page {
  width: 1000px;
  height: 66px;
  overflow: hidden;
  float: right;

  .sui-pagination {
    margin: 18px 0;

    ul {
      margin-left: 0;
      margin-bottom: 0;
      vertical-align: middle;
      width: 610px;
      float: left;

      li {
        line-height: 18px;
        display: inline-block;

        a {
          position: relative;
          float: left;
          line-height: 18px;
          text-decoration: none;
          background-color: #fff;
          border: 1px solid #e0e9ee;
          margin-left: -1px;
          font-size: 14px;
          padding: 9px 18px;
          color: #333;
        }

        &.active {
          a {
            background-color: #fff;
            color: #e1251b;
            border-color: #fff;
            cursor: default;
          }
        }

        &.prev {
          a {
            background-color: #fafafa;
          }
        }

        &.disabled {
          a {
            color: #999;
            cursor: default;
          }
        }

        &.dotted {
          span {
            margin-left: -1px;
            position: relative;
            float: left;
            line-height: 18px;
            text-decoration: none;
            background-color: #fff;
            font-size: 14px;
            border: 0;
            padding: 9px;
            color: #333;
          }
        }

        &.next {
          a {
            background-color: #fafafa;
          }
        }

        &.side {
          padding: 0px 5px 0px 5px;
        }
      }
    }

    div {
      color: #333;
      font-size: 14px;
      float: right;
      width: 241px;
    }
  }
}
</style>
