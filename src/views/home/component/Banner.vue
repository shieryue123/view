<template>
  <div>
    <div class="swiper-container my-swiper" ref="swiper">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(item, index) in images"
          :key="index"
        >
          <div class="image" :style="background(item.image)">
            <div class="height"></div>
          </div>
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
    <!-- <swiper ref="mySwiper" :options="swiperOptions" class="my-swiper">
      <swiper-slide
        v-for="(item, index) in images"
        :key="index"
      >
        <div class="image" :style="background(item.image)">
          <div class="height"></div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper> -->
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'

export default {
  name: 'banner',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    this.initSwiper()
  },
  watch: {
    images () {
      this.$nextTick(() => {
        this.swiper.updateSlides()
      })
    }
  },
  methods: {
    initSwiper () {
      this.swiper = new Swiper(this.$refs.swiper, {
        pagination: {
          el: '.swiper-pagination'
        }
      })
    },
    background (image) {
      return {
        backgroundImage: `url(${image})`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-swiper {
  .image {
    display: block;
    width: 100%;
    overflow: hidden;
    background-size: cover;
    .height {
      margin-top: 41%;
    }
  }
}
</style>
