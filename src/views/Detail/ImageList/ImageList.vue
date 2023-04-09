<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide, index) in skuImageList" :key="slide.id">
        <img :src="slide.imgUrl" :class="{ active: curIndex === index }" @click="changeCurIndex(index)" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
// 引入 Swiper
import Swiper from 'swiper'
export default {
  name: 'ImageList',
  data() {
    return {
      curIndex: 0
    }
  },
  props: ['skuImageList'],
  methods: {
    // 点击图片 -> 改变curIndex
    changeCurIndex(index) {
      this.curIndex = index
      this.$bus.$emit('getIndex', this.curIndex)
    }
  },
  // 数据监听
  watch: {
    // 监听放大镜下面的轮播图数据
    skuImageList: {
      immediate: true,
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          new Swiper(
            // '.swiper-container'
            // 使用 ref 获取元素
            this.$refs.cur,
            {
              // 如果需要前进后退按钮
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              },
              // 设置slider容器能够同时显示的slides数量
              slidesPerView: 4,
              // 同时滚动的slides数量
              slidesPerGroup: 1
            }
          )
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
