<template>
  <div>
    <a href="javascript:;" class="search-bar">
      <icon name="search" :size="30" />
      <input type="search" placeholder="小区、街道、大厦" v-debounce="val" @keyup.enter="search" />
    </a>
    <div class="keyword-list" v-show="keywordList.length >= 1">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import map from '@/utils/map'

export default {
  name: 'SearchBar',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      val: this.value || '',
      keywordList: [],
      flg: false
    }
  },
  watch: {
    val (newVal) {
      this.$emit('input', newVal)
      if (this.flg) {
        this.flg = false
        return
      }
      this.getKeyword()
    },
    value (newVal) {
      this.val = newVal
    }
  },
  // filters: {
  //   highlight: (val, key) => {
  //     return val.replace(key, `<b>${key}</b>`)
  //   }
  // },
  created () {
    console.log(this, 'a')
  },
  methods: {
    async getKeyword () {
      const res = await map.autocomplete(this.val)
      this.keywordList = res.tips ? res.tips : []
    },
    highlight (val, key) {
      return val.replace(key, `<b>${key}</b>`)
    },
    selected (val) {
      this.val = val
      this.keywordList = []
      this.flg = true
      this.$emit('search')
    },
    search () {
      this.keywordList = []
      this.$emit('search')
    }
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  @include wh(auto, 64px);
  @include flex(row, center, center);
  margin: 17px 30px;
  background: #F6F6F6;
  padding: 0 20px;
  flex-shrink: 0;
  overflow: hidden;
  input {
    flex: 1;
    border: 0;
    outline: none;
    background: transparent;
    padding-left: 20px;
  }
}
.keyword-list {
  @include wh(100vw, calc(100vh - 64px - 34px));
  background: rgba(0, 0, 0, 0.2);
  ul {
    background: #fff;
    a {
      @include border-1px(bottom);
      display: block;
      padding: 20px 40px;
      font-size: 24px;
      color: #111111;
      line-height: 1.5;
    }
  }
}
</style>
