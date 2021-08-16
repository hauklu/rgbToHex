<template>
  <div class="home">
    <h1>首页</h1>
    <button
      class="rgb-to-hex"
      @click="openRgbToHex"
    >RGB颜色转换成16进制</button>
  </div>
</template>

<script>
// console.log(@)
export default {
  components: {
  },
  data() {
    return {
      visi: {}
    }
  },
  mounted() {
    // console.log(this.$router.options.routes)
  },
  methods: {
    // 打开rgb颜色转换成16进制组件
    openRgbToHex() {
      this.$router.push({ path: 'rgbToHex' })
    }
  }
}
</script>

<style lang="less" scoped>
@import "~styles/test.less";
.home {
  h1 {
    line-height: 1rem;
    color: @testColor;
  }

  .rgb-to-hex {
    padding: 0.05rem 0.1rem;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
