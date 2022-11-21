<template>
  <div>
    <a href="javascript:;" class="search-bar">
      <icon name="search" :size="30" />
      <input type="search" placeholder="搜索校园超市商品" v-debounce="val" @keyup.enter="search" />
    </a>
    <div class="keyword-list" v-show="keywordList.length >= 1">
      <ul>
        <a
          href="javascript:"
          v-for="(item, index) in keywordList"
          :key="index"
          v-html="highlight(item.suggestedKeyword, val)"
          @click="selected(item.suggestedKeyword)"
        >
          <!-- {{}} -->
        </a>
      </ul>
    </div>
  </div>
</template>

<script>
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
      const res = await this.$api.search.keyword({
        keyword: this.val
      })
      this.keywordList = res.data.data ? res.data.data.suggestions : []
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
  border-radius: 64px;
  padding: 0 20px;
  flex-shrink: 0;
  input {
    flex: 1;
    border: 0;
    outline: none;
    background: transparent;
    padding-left: 20px;
  }
}
.keyword-list {
  @include wh(100vw, calc(100vh - 64px));
  background: rgba(0, 0, 0, 0.2);
  ul {
    background: #fff;
    a {
      @include wh(100%, 60px);
      padding: 0 40px;
      line-height: 60px;
      font-size: 24px;
      color: #111111;
    }
  }
}
</style>
