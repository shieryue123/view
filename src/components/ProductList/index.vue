<template>
  <div class="product-list">
    <router-link
      v-for="(item, index) in list"
      :key="index"
      class="product-item"
      :to="`/product/${item.id}`"
    >
      <dl>
        <dt><img :src="item.cover" /></dt>
        <dd>
          <header>
            <h2>{{ item.title }}</h2>
            <p>{{ item.describe }}</p>
          </header>
          <footer>
            <output>
              <span>¥</span><b>{{ item.price }}</b><s>{{ item.oldPrice }}</s>
            </output>
            <a
              href="javascript:;"
              class="add_car"
              @click.stop="addCar(item.id)"
            ><icon name="car_btn" :size="28" /></a>
          </footer>
        </dd>
      </dl>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    addCar (productId) {
      this.$store.dispatch('car/add', {
        product_id: productId
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.product-list {
  .product-item {
    @include border-1px(bottom);
    padding: 30px;
    box-sizing: padding-box;
    overflow: hidden;
    display: block;
    dl {
      @include wh(100%, auto);
      @include flex();
      dt {
        @include wh(240px, 240px);
        margin-right: 30px;
        img {
           @include wh(240px, 240px);
        }
      }
      dd {
        @include flex(column, space-between, space-between);
        flex: 1;
        header {
          h2 {
            @include ellipsis(2);
            font-size: $font-size-m;
            line-height: 1.5;
            color: #111111;
            font-weight: normal;
          }
          p {
            font-size: 24px;
            color: #999999;
          }
        }
        footer {
          output {
            font-size: $font-size-s;
            color: $color-primary;
            b {
              font-size: $font-size-l;
              color: $color-primary;
            }
            s {
              color: #C0C0C0;
              margin-left: 10px;
            }
          }
          .add_car {
            @include wh(66px, 66px);
            @include flex(row, center, center);
            border-radius: 100%;
            background: $color-primary;
            position: absolute;
            right: 31px;
            bottom: 25px;
          }
        }
      }
    }
  }
}
</style>
