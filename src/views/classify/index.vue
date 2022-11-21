<template>
  <div class="classify-page">
    <search-bar />
    <div class="content">
      <div class="left-menu">
        <tab-menu :options="leftMenuOptions" class="tab-menu" @change="leftMenuChange" />
      </div>
      <div class="right-content">
        <div class="right-menu">
          <tab-menu :options="rightMenuOptions" forkey="id" class="tab-menu" @change="rightMenuChange" />
          <!-- <menu>
            <a href="javasscript:;">排序</a>
            <xxx-xxx>
              <xxxx-xxx>智能排序</xxxx-xxx>
              <xxxx-xxx>智能排序</xxxx-xxx>
              <xxxx-xxx>智能排序</xxxx-xxx>
              <xxxx-xxx>智能排序</xxxx-xxx>
            </xxx-xxx>
          </menu> -->
        </div>
        <div class="product-content">
          <product-list :list="productData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from './components/SearchBar'
export default {
  name: 'classify',
  data () {
    return {
      leftMenuOptions: [],
      rightMenuOptions: [],
      productData: [],
      fetchListParams: {
        page: 1,
        page_size: 10,
        wareId: 0
      }
    }
  },
  watch: {
    fetchListParams: {
      handler: 'getProductList',
      deep: true
    }
  },
  components: {
    SearchBar
  },
  created () {
    this.initData()
  },
  mounted () {
    console.log(this, 'aaa', this.constructor.options)
  },
  methods: {
    async initData () {
      const res = await this.$api.product.classify()
      this.leftMenuOptions = res.data
      this.rightMenuOptions = [{
        text: '全部',
        id: res.data[0].id
      }].concat(res.data[0].children)
      this.fetchListParams.wareId = res.data[0].id
    },
    async getProductList () {
      const res = await this.$api.product.list(this.fetchListParams)
      if (this.fetchListParams.page === 1) {
        this.productData = res.data
      } else {
        this.productData = this.productData.concat(res.data)
      }
    },
    leftMenuChange (index) {
      const res = this.leftMenuOptions[index]
      this.rightMenuOptions = [{
        text: '全部',
        id: res.id
      }].concat(res.children)
      this.fetchListParams.wareId = res.id
      this.fetchListParams.page = 1
    },
    rightMenuChange (index) {
      const id = this.rightMenuOptions[index].id
      this.fetchListParams.wareId = id
      this.fetchListParams.page = 1
    }
  }
}
</script>

<style lang="scss" scoped>
.classify-page {
  @include wh(100vw, calc(100vh - 112px) );
  @include flex(column);
  overflow: hidden;
  .content {
    @include flex();
     @include border-1px(top);
    height: calc(100vh - 112px - 98px);
    flex: 1;
    .left-menu {
      @include wh(172px, 100%);
      overflow: auto;
      background: #FAFAFA;
      flex-shrink: 0;
      /deep/ .menu {
        @include wh(100%, 100%);
        nav {
          @include flex(column);
          a.active {
            background: #fff;
          }
        }
      }
    }
    .right-content {
      @include wh(100%, 100%);
      @include flex( column );
      flex: 1;
      .right-menu {
        @include border-1px(bottom);
      }
      .product-content {
        flex: 1;
        overflow: auto;
        /deep/ .product-list{
          .product-item {
            dl {
              dt {
                @include wh(186px, 186px);
                img {
                  @include wh(186px, 186px);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
