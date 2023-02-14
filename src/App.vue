<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.isShow"></Footer>
  </div>
</template>

<script>
// 引入
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'my-App',
  // 注册
  components: {
    Header,
    Footer
  },
  mounted() {
    // App.Vue组件的mounted只执行一次，不会重复请求数据
    // 通知Vuex发请求，获取三级列表的数据并存储到仓库中
    this.$store.dispatch('getCategoryList')
  }
}
</script>

<style lang="less" scoped></style>
