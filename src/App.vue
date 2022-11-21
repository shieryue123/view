<template>
  <div id="app">
    <keep-alive include="EditAddress">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState('user', ['token', 'position'])
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      // if (!this.position) {
      //   this.$router.push({
      //     path: '/geolocation',
      //     query: {
      //       callbcakUrl: this.$router.history.current.fullPath
      //     }
      //   })
      // }
      if (this.token) {
        this.$store.dispatch('user/getUserInfo')
      }
    }
  }
}
</script>

<style lang="scss">
html {
  font-size: 100px;
}
.page {
  width: 100vw;
  min-height: 100vh;
  background: #F8F8F8;
}
</style>
