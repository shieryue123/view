<template>
  <div class="search-page">
    <search-bar v-model="keyword" @search="search" />
    <history-search />
    <product-list :list="productData" />
  </div>
</template>

<script>
import SearchBar from './components/SearchBar'
import HistorySearch from './components/HistorySearch'
export default {
  name: 'search',
  data () {
    return {
      keyword: this.$route.query.keyword || '',
      fetchListParams: {
        page: 1,
        page_size: 10,
        keyword: this.$route.query.keyword || ''
      },
      productData: []
    }
  },
  components: {
    SearchBar,
    HistorySearch
  },
  watch: {
    '$route' (newValue) {
      this.fetchListParams.keyword = newValue.query.keyword
    },
    fetchListParams: {
      handler: 'getProductList',
      deep: true,
      immediate: true
    }
  },
  onReachBottom () {
    this.fetchListParams.page += 1
  },
  methods: {
    search () {
      if (this.$route.query.keyword === this.keyword) return
      this.$router.push({
        path: '/search',
        query: {
          keyword: this.keyword
        }
      })
    },
    async getProductList () {
      if (this.keyword === '') return
      const res = await this.$api.product.list(this.fetchListParams)
      if (this.fetchListParams.page === 1) {
        this.productData = res.data
      } else {
        this.productData = this.productData.concat(res.data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
