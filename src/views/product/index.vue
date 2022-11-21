<template>
  <div>
    {{ $route.params.id }}
    <footer>
      <div class="icon-group">
        <a href="javascript:;"><icon name="home-active" /></a>
        <a href="javascript:;"><icon name="car" /></a>
      </div>
      <div class="btn-group">
        <el-button @click="addCar">加入购物车</el-button>
        <el-button>直接购买</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  methods: {
    addCar () {
      this.$store.dispatch('car/add', {
        product_id: this.$route.params.id
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
