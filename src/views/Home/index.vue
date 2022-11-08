<template>
  <div>
    <TypeNav />
    <ListContainer />
    <RecommEnd />
    <Rank />
    <Like />
    <Floor />
    <Floor />
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
  }
}
</script>

<style lang="less" scoped></style>
