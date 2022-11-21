<template>
  <div>
    <header-bar />
    <banner :images="bannerData" />
    <div :style="{position: 'relative'}">
      <shortcut-menu :menu="menuData" />
      <div class="content" ref="content">
        <tab-menu :options="options" :scrollX="false" class="tab-menu" @change="navChange" />
        <product-list :list="productData" />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from './component/HeaderBar'
import Banner from './component/Banner'
import ShortcutMenu from './component/shortcutMenu'
import scroll from '@/mixin/scroll'

import { offset } from '@/utils/utils'

export default {
  name: 'home',
  data () {
    return {
      bannerData: [],
      menuData: [],
      productData: [],
      options: [],
      fetchListParams: {
        page: 1,
        page_size: 10,
        brandId: 1
      }
    }
  },
  mixins: [scroll],
  components: {
    HeaderBar,
    Banner,
    ShortcutMenu
  },
  watch: {
    fetchListParams: {
      handler: 'getProductList',
      deep: true,
      immediate: true
    }
  },
  created () {
    this.initData()
  },
  mounted () {
    console.log(this.$options, 'aaa')
  },
  onReachBottom () {
    this.fetchListParams.page += 1
  },
  methods: {
    initData () {
      const { banner, menu, nav } = this.$api.home
      const initApi = [banner(), menu(), nav()]
      Promise.all(initApi).then((res) => {
        this.bannerData = res[0].data
        this.menuData = res[1].data
        this.options = res[2].data.map(item => ({
          ...item,
          text: item.name
        }))
      })
      // this.$api.home.banner().then((res) => {
      //   this.bannerData = res.data
      // })
      // this.$api.home.menu().then((res) => {
      //   this.menuData = res.data
      // })
      // this.$api.home.nav().then((res) => {
      //   this.options = res.data.map(item => ({
      //     ...item,
      //     text: item.name
      //   }))
      // })
    },

    async getProductList () {
      const res = await this.$api.product.list(this.fetchListParams)
      if (this.fetchListParams.page === 1) {
        this.productData = res.data
        this.$nextTick(() => {
          const { top } = offset(this.$refs.content)
          if (window.scrollY > top) {
            window.scrollTo(0, top)
          }
        })
      } else {
        this.productData = this.productData.concat(res.data)
      }
    },

    navChange (index) {
      const id = this.options[index].id
      this.fetchListParams = {
        brandId: id,
        page: 1,
        page_size: 5
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-menu {
  @include border-1px(bottom);
  position: sticky;
  top: 0;
  background: #fff;
  /deep/ a {
    font-weight: normal;
    &.active {
      font-weight: bold;
    }
  }
}
</style>
