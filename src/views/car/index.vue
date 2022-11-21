<template>
  <div>
    <div class="car-list">
      <dl v-for="(item, index) in list" :key="index">
        <dt>
          <!-- <input type="checkbox" :checked="item.actived === '1'" @change="updateStatus(item)" /> -->
          <chekbox :checked="item.actived === '1'" @change="updateStatus(item)" />
          <img :src="item.cover" />
        </dt>
        <dd>
          <header>
            <h2>{{ item.title }}</h2>
            <!-- <p></p> -->
          </header>
          <footer>
            <output>
              <span>¥</span><b>{{ item.price }}</b><s>{{ item.oldPrice }}</s>
            </output>
            <input-number
              v-model="item.num"
              :min="0"
              @change="updateItem(item, index)"
              @minChange="removeItem(item)"
            ></input-number>
          </footer>
        </dd>
      </dl>
    </div>
    <footer class="footer-bar">
      <dl>
        <dt>
          <label for="">
            <chekbox :checked="isAllChecked" @change="checkAll" />
            <span>全选</span>
          </label>
          <output>合计: {{ price }}</output>
        </dt>
        <dd>
          <el-button type="primary">去结算</el-button>
        </dd>
      </dl>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'car',
  computed: {
    ...mapState('car', ['list', 'price']),
    isAllChecked () {
      return this.list.reduce((prevValue, item, index) => {
        if (!prevValue) return false
        if (item.actived === '0') {
          return false
        } else {
          return true
        }
      }, true)
    }
  },
  methods: {
    removeItem (product) {
      if (confirm('确定删除？')) {
        this.$store.dispatch('car/delete', product.id)
      } else {
        console.log('取消')
      }
    },
    updateItem (product, index) {
      this.$store.dispatch('car/update', {
        id: product.id,
        params: {
          num: product.num
        }
      })
    },
    updateStatus (product) {
      this.$store.dispatch('car/update', {
        id: product.id,
        params: {
          actived: product.actived === '1' ? '0' : '1'
        }
      })
    },
    checkAll (product) {
      this.$store.dispatch('car/updateAll', {
        id: this.list.map(item => item.id),
        actived: this.isAllChecked ? '0' : '1'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.footer-bar {
  @include wh(100vw, 99px);
  @include border-1px(top);
  line-height: 99px;
  font-size: 24px;
  position: absolute;
  bottom: 110px;
  dl {
    @include flex(row);
    dt {
      @include flex(row, center, space-between);
      padding: 0 20px;
      flex: 1;
      label {
        @include flex(row, center);
      }
    }
    dd {
      width: 240px;
      /deep/ button {
        height: 99px;
        line-height: 99px;
      }
    }
  }
}
.car-list {

  dl {
    @include wh(100%, auto);
    @include flex();
    @include border-1px(bottom);
    padding: 20px;
    dt {
      @include flex(row, center);
      margin-right: 30px;
      img {
          @include wh(160px, 160px);
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
        @include flex(row, center, space-between);
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
</style>
