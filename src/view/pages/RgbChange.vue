<template>
  <div class="box">
    <p class="title">rgb颜色: </p>
    <div class="rgb">
      <input
        v-model="rgb.r"
        ref="rgbR"
        class="rgb-inp"
        type="text"
        maxlength="3"
        @input="rgbRKeyIn"
      >
      <input
        v-model="rgb.g"
        ref="rgbG"
        class="rgb-inp"
        type="text"
        maxlength="3"
        @input="rgbGKeyIn"
      >
      <input
        v-model="rgb.b"
        ref="rgbB"
        class="rgb-inp"
        type="text"
        maxlength="3"
        @input="rgbBKeyIn($event)"
      >
      <div
        :style="`background-color: #${rgbResult.val};`"
        class="rgb-color"
      />
      <button @click="rgbChangeToHex">转换</button>
    </div>
    <div
      v-show="rgbResult.visi"
      class="result-box"
    >
      <input
        type="text"
        :value="rgbResult.val"
      >
      <input
        type="button"
        value="复制"
        @click="copy(rgbResult.val)"
      >
    </div>
    <p class="title">16进制颜色: </p>
    <div class="hex">
      <input
        value="#"
        class="hex-inp-before"
      >
      <input
        v-model="hex"
        class="hex-inp"
        type="text"
        maxlength="6"
        @input="hexKeyIn"
      >
      <div
        :style="`background-color: #${hex};`"
        class="hex-color"
      />
      <button @click="hexChangeToRgb">转换</button>
    </div>
    <div
      v-show="hexResult.visi"
      class="result-box"
    >
      <input
        type="text"
        :value="hexResult.val"
      >
      <input
        type="button"
        value="复制"
        @click="copy(hexResult.val)"
      >
    </div>
    <div class="common">
      <header>常用颜色表</header>
      <table>
        <tr>
          <th>颜色</th>
          <th>英文代码</th>
          <th>形象描述</th>
          <th>十六进制</th>
          <th>RGB</th>
        </tr>
        <tr
          v-for="(i, idx) of commonColorData"
          :key="idx"
        >
          <td :style="`background-color: ${i.hex};`" />
          <td :style="`color: ${i.hex};`">{{ i.nameEN }}</td>
          <td>{{ i.nameCN }}</td>
          <td>{{ i.hex }}</td>
          <td>{{ hexToRgb(i.hex) }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import commonColor from '../assets/js/commonColor'
import { copy, ctoast, rgbToHex, hexToRgb } from '@/utils/tool.js'

export default {
  data() {
    return {
      // rgb颜色
      rgb: {
        r: undefined,
        g: undefined,
        b: undefined
      },
      // rgb颜色-转换结果
      rgbResult: {
        visi: false,
        val: ''
      },
      // 16进制颜色
      hex: '',
      // 16进制颜色-转换结果
      hexResult: {
        visi: false,
        val: ''
      },
      // 常用颜色表数据
      commonColorData: []
    }
  },
  created() {
    this.initCommonColor()
  },
  mounted() {
    this.initFocus()
  },
  methods: {
    initCommonColor() {
      this.commonColorData = commonColor
    },
    // rgb-蓝色输入监听
    rgbBKeyIn(e) {
      if (this.rgb.b.length >= 3) {
        if (this.rgb.r.length >= 3 && this.rgb.g.length >= 3) {
          this.rgbChangeToHex()
        }
      }
    },
    // rgb-绿色输入监听
    rgbGKeyIn(e) {
      if (this.rgb.g.length >= 3) {
        this.$refs.rgbB && this.$refs.rgbB.focus()
      }
    },
    // rgb-红色输入监听
    rgbRKeyIn(e) {
      if (this.rgb.r.length >= 3) {
        this.$refs.rgbG && this.$refs.rgbG.focus()
      }
    },
    // 初始化光标聚焦
    initFocus() {
      this.$refs.rgbR && this.$refs.rgbR.focus()
    },
    // 复制
    copy(val) {
      copy(val)
    },
    // 16进制输入监听
    hexKeyIn() {
      if (this.hex.length >= 6) this.hexChangeToRgb()
    },
    // 点击16进制转换触发
    hexChangeToRgb() {
      this.hexResult.visi = true
      this.hexResult.val = hexToRgb(this.hex)
    },
    // 点击rgb转换触发
    rgbChangeToHex() {
      const str = [this.rgb.r, this.rgb.g, this.rgb.b]
      this.rgbResult.visi = true
      this.rgbResult.val = rgbToHex(str)
    },
    ctoast,
    rgbToHex,
    hexToRgb
  }
}
</script>

<style lang="less" scoped>
.box {
  .title {
    line-height: 2rem;
    font-weight: bold;
    font-size: 0.5rem;
    color: #ffb400;
  }

  .rgb {
    .rgb-inp {
      width: 1rem;
      height: 0.6rem;
    }

    .rgb-color {
      display: inline-block;
      vertical-align: top;
      width: 1rem;
      height: 0.6rem;
      margin-left: 0.2rem;
      border: 1px solid #ccc;
    }

    button {
      margin-left: 0.2rem;
    }
  }

  .result-box {
    margin-top: 0.5rem;
  }

  .hex {
    font-size: 0;

    .hex-inp-before,
    .hex-inp {
      height: 0.6rem;
      font-size: 0.4rem;
      margin: 0;
    }

    .hex-inp-before {
      width: 0.3rem;
      text-align: center;
    }

    .hex-inp {
      width: 3rem;
      letter-spacing: 0.5em;
    }

    .hex-color {
      display: inline-block;
      vertical-align: top;
      width: 1rem;
      height: 0.6rem;
      margin-left: 0.2rem;
      border: 1px solid #ccc;
    }

    button {
      margin-left: 0.2rem;
    }
  }

  .common {
    margin-top: 1rem;

    header {
      line-height: 1rem;
      font-size: 0.44rem;
    }

    table {
      width: 10.8rem;
      background: #fff;
      margin: 0 auto;

      tr,
      th,
      td {
        border: 1px solid #ccc;
      }

      tr {
      }

      th {
        height: 0.8rem;
        font-weight: bold;
        text-align: center;
        font-size: 0.32rem;
        background: #eee;
      }

      td {
        height: 0.5rem;
        font-size: 0.28rem;
      }
    }
  }
}
</style>
