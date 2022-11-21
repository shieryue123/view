<template>
  <div id="container">
    <div class="content">
      <img src="https://static.dmall.com/kayak-project/address/dist/address/common/image/logo-slogan-new.png" class="logo" />
      <div class="map">
      </div>
      <p>正在定位</p>
    </div>

    <p>高品质 低价格 好服务</p>
  </div>
</template>

<script>
import map from '@/utils/map'

export default {
  name: 'Map',
  mounted () {
    this.geolocation()
  },
  methods: {
    geolocation () {
      map.geolocation().then((res) => {
        this.$store.commit('user/SET_USER_LOCATION', {
          position: res.position,
          formattedAddress: res.formattedAddress,
          addressComponent: res.addressComponent
        })
        // console.log(this.$route.query, res)
        const path = this.$route.query.callbackUrl || '/home'
        this.$router.replace(path)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#container {
  @include wh(100vw, 100vh);
  .content {
    @include flex(column, center, center);
    .logo {
      @include wh(320px, auto);
    }
    .map {
      @include wh(300px, 300px);
      @include flex();
      border-radius: 100%;
      overflow: hidden;
      background-image: url(https://static.dmall.com/kayak-project/address/dist/address/common/image/map.png);
      animation: movemap 5s infinite ease-out;
      background-size: 150%;
    }
  }
}

@keyframes movemap {
  0% {
    background-position: 0 -30%;
  }

  25% {
    background-position: -30% -30%;
  }

  50% {
    background-position: -30% 30%;
  }

  75% {
    background-position: 30% 30%;
  }

  100% {
    background-position: 0% -30%;
  }
}
</style>
