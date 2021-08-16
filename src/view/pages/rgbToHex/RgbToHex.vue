<template>
  <div class="box">
    <p class="title">rgb颜色: </p>
    <div class="rgb">
      <div class="inp">
        <input
          v-model="rgb.r"
          ref="rgbR"
          type="text"
          maxlength="3"
          @input="rgbRKeyIn"
        >
        <input
          v-model="rgb.g"
          ref="rgbG"
          type="text"
          maxlength="3"
          @input="rgbGKeyIn"
        >
        <input
          v-model="rgb.b"
          ref="rgbB"
          type="text"
          maxlength="3"
          @input="rgbBKeyIn($event)"
        >
        <span
          class="icon-close"
          @click="clearRgbInp"
        >+</span>
      </div>
      <button @click="rgbChangeToHex">转换</button>
      <div
        :style="`background-color: #${rgbResult.val};`"
        class="rgb-color"
      />
    </div>
    <div class="result">
      <div v-show="rgbResult.visi">
        <input
          type="text"
          :value="rgbResult.val"
        >
        <button @click="copy(rgbResult.val)">复制</button>
      </div>
    </div>
    <p class="title">16进制颜色: </p>
    <div class="hex">
      <div class="hex-inp">
        <input
          value="#"
          class="before"
        >
        <input
          v-model="hex"
          class="inp"
          type="text"
          maxlength="6"
          @input="hexKeyIn"
        >
        <span
          class="icon-close"
          @click="clearHexInp"
        >+</span>
      </div>

      <button @click="hexChangeToRgb">转换</button>
      <div
        :style="`background-color: #${hex};`"
        class="hex-color"
      />
    </div>
    <div class="result">
      <div v-show="hexResult.visi">
        <input
          type="text"
          :value="hexResult.val"
        >
        <button @click="copy(hexResult.val)">复制</button>
      </div>
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
import commonColor from '@/view/assets/js/commonColor'
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
    // 清空hex输入框
    clearHexInp() {
      this.hex = ''
    },
    // 清空rgb输入框
    clearRgbInp() {
      this.rgb = {
        r: undefined,
        g: undefined,
        b: undefined
      }
    },
    // 初始化常用颜色表
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
      const arr = [this.rgb.r, this.rgb.g, this.rgb.b]
      this.rgbResult.visi = true
      this.rgbResult.val = rgbToHex(arr)
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
    .inp {
      display: inline-block;
      padding: 0.1rem;
      border-radius: 5px;
      background: #ccc;
      input {
        width: 1rem;
        height: 0.6rem;
      }

      .icon-close {
        display: inline-block;
        vertical-align: middle;
        transform: rotate(45deg);
        font-size: 0.6rem;
        color: #000;
        &:hover {
          cursor: pointer;
        }
      }
    }

    .rgb-color {
      display: inline-block;
      vertical-align: middle;
      width: 1rem;
      height: 0.6rem;
      margin-left: 0.2rem;
      border: 1px solid #ccc;
    }

    button {
      width: 1rem;
      height: 0.6rem;
      margin-left: 0.2rem;
      &:hover {
        cursor: pointer;
      }
    }
  }

  .hex {
    font-size: 0;
    .hex-inp {
      position: relative;
      display: inline-block;
      .before,
      .inp {
        height: 0.6rem;
        font-size: 0.4rem;
        margin: 0;
      }

      .before {
        width: 0.3rem;
        text-align: center;
      }

      .inp {
        width: 3rem;
        letter-spacing: 0.5em;
      }

      .icon-close {
        position: absolute;
        right: 0;
        display: inline-block;
        transform: rotate(45deg);
        font-size: 0.6rem;
        color: #000;
        &:hover {
          cursor: pointer;
        }
      }
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
      width: 1rem;
      height: 0.6rem;
      margin-left: 0.2rem;
      &:hover {
        cursor: pointer;
      }
    }
  }

  .result {
    width: 5rem;
    height: 0.5rem;
    margin: 0 auto;
    margin-top: 0.5rem;

    input {
      width: 3rem;
      height: 0.5rem;
    }

    button {
      display: inline-block;
      width: 1rem;
      height: 0.5rem;
      &:hover {
        cursor: pointer;
      }
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
