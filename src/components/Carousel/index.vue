<template>
  <div class="swiper-container" ref="floor1Swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入 Swiper
import Swiper from 'swiper'
export default {
  name: 'CarouSel',
  props: ['list'],
  // 实例化 Swiper
  watch: {
    list: {
      // 监听不到数据变化，开启立即监听
      immediate: true,
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          new Swiper(
            // '.swiper-container'
            // 使用 ref 获取元素
            this.$refs.floor1Swiper,
            {
              // 自动循环
              autoplay: {
                stopOnLastSlide: true
              },

              loop: true, // 循环模式选项

              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
                clickable: true
              },

              // 如果需要前进后退按钮
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              }
            }
          ) /*
          // 解决定义属性却不使用的报错
          if (mySwiper) {
            mySwiper.autoplay.running = true
          } */
        })
      }
    }
  }
}
</script>

<style></style>
