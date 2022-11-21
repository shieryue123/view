<template>
  <div class="map-page">
    <search-bar @search="select" />
    <div id="container"></div>
    <div class="pois">
      <ul class="pois-list">
        <li v-for="(item, index) in pois" :key="index" @click="select(item)">
          <a href="javascript:;">
            <h2>{{ item.name }}</h2>
            <p>{{ item.address }}</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AMap from 'AMap'
import AMapUI from 'AMapUI'
import SearchBar from './components/SearchBar'
import storage from '@/utils/storage'

export default {
  name: 'mapPage',
  data () {
    return {
      pois: []
    }
  },
  components: {
    SearchBar
  },
  mounted () {
    console.log(this.$router)
    this.initMap()
  },
  methods: {
    initMap () {
      AMapUI.loadUI(['misc/PositionPicker'], (PositionPicker) => {
        var map = new AMap.Map('container', {
          zoom: 16,
          scrollWheel: false,
          noIpLocate: 2
        })
        var positionPicker = new PositionPicker({
          mode: 'dragMap',
          map: map
        })
        positionPicker.on('success', (positionResult) => {
          this.pois = positionResult.regeocode.pois
        })
        positionPicker.on('fail', (positionResult) => {
          console.log('结束')
        })
        positionPicker.start()

        map.plugin('AMap.Geolocation', function () {
          const geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
            convert: true,
            showButton: true,
            buttonPosition: 'LB',
            buttonOffset: new AMap.Pixel(10, 20),
            showMarker: true,
            showCircle: true,
            panToLocation: true,
            zoomToAccuracy: true
          })
          map.addControl(geolocation)
          geolocation.getCurrentPosition()
        })
        // map.panBy(0, 1)
      })
    },
    select (res) {
      const consignee = storage.getItem('consignee') || {
        name: '',
        phone: '',
        address: ''
      }
      consignee.location = {
        position: res.location,
        formattedAddress: res.address,
        addressComponent: res.name
      }
      storage.setItem('consignee', consignee)
      this.$router.back()
    }
  },
  beforeRouteEnter (to, from, next) {
    if (history.length > 2) {
      next()
    } else {
      next('/edit/address')
    }
  }
}
</script>

<style lang="scss" scoped>
.map-page {
  @include wh(100vw, 100vh);
  #container {
    @include wh(100vw, 400px);
  }

  .pois-list {
    @include wh(100vw, calc(100vh - 400px - 64px));
    overflow: auto;
    li {
      @include border-1px(bottom);
      a {
        color: #333;
        padding: 20px;
        display: block;
        line-height: 1.5;
        h2 {
          font-size: $font-size-m;
        }
        p {
          font-size: $font-size-s;
          color: grey;
        }
      }
    }
  }
}
</style>
