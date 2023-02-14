<template>
  <div>
    <TypeNav />
    <ListContainer />
    <RecommEnd />
    <Rank />
    <Like />
    <!-- 可以在自定义组件中使用v-for -->
    <!-- 使用props 父传子给 floor组件 -->
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor" />
    <Brand />
  </div>
</template>

<script>
// 引入组件
import ListContainer from '@/views/Home/ListContainer'
import RecommEnd from '@/views/Home/Recommend'
import Rank from '@/views/Home/Rank'
import Like from '@/views/Home/Like'
import Floor from '@/views/Home/Floor'
import Brand from '@/views/Home/Brand'
// 引入 mapstate
import { mapState } from 'vuex'
export default {
  name: 'my-home',
  // 注册组件
  components: {
    ListContainer,
    RecommEnd,
    Rank,
    Like,
    Floor,
    Brand
  },
  // 派发 action
  mounted() {
    this.$store.dispatch('getFloorList')
  },
  // 计算属性
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  }
}
</script>

<style lang="less" scoped></style>
