<template>
  <div class="wrap">
    <a href="javascript:;" class="search-bar">
      <icon name="search" :size="30" />
      <input type="search" placeholder="小区、街道、大厦" v-debounce="val" />
    </a>
    <div class="keyword-list" v-show="keywordList.length >= 1">
      <ul>
        <a
          href="javascript:"
          v-for="(item, index) in keywordList"
          :key="index"
          @click="selected(item)"
        >
          <h2>{{ item.name }}</h2>
          <p>{{ item.district }}</p>
        </a>
      </ul>
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
      console.log(123123)
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
      console.log(123123)
      const res = await map.autocomplete(this.val)
      this.keywordList = res.tips ? res.tips : []
    },
    highlight (val, key) {
      return val.replace(key, `<b>${key}</b>`)
    },
    selected (val) {
      this.$emit('search', val)
      this.val = val
      this.keywordList = []
      this.flg = true
    },
    search (item) {
      this.$emit('search', item)
      this.keywordList = []
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  background: #fff;
  overflow: hidden;
}
.search-bar {
  @include wh(auto, 64px);
  @include flex(row, center, center);
  margin: 17px 30px;
  background: #F6F6F6;
  // background: #fff;
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
