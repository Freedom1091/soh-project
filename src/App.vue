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
  }
}
</script>

<style lang="less" scoped></style>
