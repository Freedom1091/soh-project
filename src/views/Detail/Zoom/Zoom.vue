<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="bigImage" />
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'ZooM',
  data() {
    return {
      curIndex: 0
    }
  },
  props: ['skuImageList'],
  methods: {
    // 放大镜鼠标移动事件
    handler(event) {
      // console.log(event)
      const mask = this.$refs.mask
      const bigImage = this.$refs.bigImage
      let left = event.offsetX - mask.offsetWidth / 2
      let top = event.offsetY - mask.offsetHeight / 2
      // 约束遮罩层的可移动范围
      if (left < 0) left = 0
      if (left > mask.offsetWidth) left = mask.offsetWidth
      if (top < 0) top = 0
      if (top > mask.offsetHeight) top = mask.offsetHeight
      // console.log(mask.style)
      // 操作dom：修改遮罩层的 left/top 的值
      mask.style.left = left + 'px'
      mask.style.top = top + 'px'
      // 修改大图的 left/top 的值
      bigImage.style.left = -2 * left + 'px'
      bigImage.style.top = -2 * top + 'px'
    }
  },
  mounted() {
    // 获取 ImageList 组件传递过来的索引值
    this.$bus.$on('getIndex', index => {
      this.curIndex = index
    })
  },
  // 计算属性
  computed: {
    // 在父组件中使用 || [{}] 解决
    imgObj() {
      return this.skuImageList[this.curIndex]
    }
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
