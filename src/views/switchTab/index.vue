<template>
  <div class="switch-tab-page">
    <router-view />
    <footer-nav
      :tabbar="tabbar"
    />
  </div>
</template>

<script>
export default {
  name: 'switch-tab',
  data () {
    return {
      tabbar: [
        {
          path: '/home',
          text: '首页',
          icon: 'home',
          selectedIcon: 'home-active'
        },
        {
          path: '/classify',
          text: '分类',
          icon: 'classify',
          selectedIcon: 'classify-active'
        },
        {
          path: '/car',
          text: '购物车',
          icon: 'car',
          selectedIcon: 'car-active'
        },
        {
          path: '/mine',
          text: '我的',
          icon: 'mine',
          selectedIcon: 'mine-active'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
