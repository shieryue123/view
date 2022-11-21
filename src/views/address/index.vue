<template>
  <div class="address-page">
    <search-bar @search="select" />
    <a href="javascript:;" class="gps-btn" @click="geolocation" ><icon name="gps" :size="40" />定位到当前地址</a>
    <!-- <search v-model="val">
      <option v-slot:default="slotProps">
        <a href="javascript:;">
          <h2>{{slotProps.name}}</h2>
          <p>{{slotProps.name}}</p>
        </a>
      </option>
    </search> -->
    <el-button transparent type="primary" class="add-btn" @click="$router.push('/edit/address')">新增地址</el-button>

    <div class="address-list">
      <h2 class="title">我的地址</h2>
      <ul>
        <li v-for="(item, index) in address" :key="index" @click="select(item)">
          <a href="javascript:;">
            <h2>
              <b>{{ item.name }}</b>
              <output>{{ item.phone }}</output>
            </h2>
            <p>{{ item.location.addressComponent }}</p>
          </a>
        </li>
      </ul>
    </div>
    <popup
      title="选择地址"
      :visible.sync="poisVisible"
    >
      <ul class="address-list">
        <li v-for="(item, index) in pois" :key="index" @click="select(item)">
          <a href="javascript:;">
            <h2>{{ item.name }}</h2>
            <p>{{ item.address }}</p>
          </a>
        </li>
      </ul>
    </popup>
  </div>
</template>

<script>
import SearchBar from './component/SearchBar'
import map from '@/utils/map'
import { mapState } from 'vuex'

export default {
  name: 'addressPage',
  data () {
    return {
      val: '',
      pois: [],
      poisVisible: false
    }
  },
  computed: {
    ...mapState('user', ['address'])
  },
  components: {
    SearchBar
  },
  methods: {
    select (res) {
      this.$store.commit('user/SET_USER_LOCATION', {
        position: res.location,
        formattedAddress: res.address + res.name,
        addressComponent: {
          ...res
        }
      })
      this.$router.back()
    },
    geolocation () {
      this.$loading.show()
      map.geolocation({
        extensions: 'all'
      }).then((res) => {
        console.log(res)
        this.$loading.hide()
        this.pois = res.pois
        this.poisVisible = true
      }).catch(() => {
        this.$message.error('定位失败')
        this.$loading.hide()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.address-page {
  min-height: 100vh;
  overflow: hidden;
  background: #f6f6f6;
  .gps-btn {
    @include wh(100%, 88px);
    @include flex(row, center);
    margin-top: 20px;
    padding: 0 20px;
    line-height: 88px;
    background: #fff;
    font-size: $font-size-s;
    color: grey;
    /deep/ .icon {
      margin-right: 20px;
    }
  }
  .add-btn {
    position: absolute;
    bottom: 0;
    border: 0 !important;
    background: #fff !important;
  }
  .address-list {
    ul {
      &:empty {
        &::after {
          content: '暂无数据';
        }
      }
    }
    .title {
      font-size: 28px;
      line-height: 88px;
      padding: 0 20px;
    }
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
