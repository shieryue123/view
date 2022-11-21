<template>
  <footer class="footer-nav">
    <nav>
      <router-link
        v-for="(item, index) in tabbar"
        :key="index"
        :to="item.path"
        active-class="active"
      >
        <icon :name="item.icon" class="default" />
        <icon :name="item.selectedIcon" class="active" />
        <span>{{ item.text }}</span>
        <output v-if="item.path === '/car'" class="count">{{ count }}</output>
      </router-link>
    </nav>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'FooterNav',
  props: {
    tabbar: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters('car', ['count'])
  }
}
</script>

<style lang="scss" scoped>
.footer-nav {
  @include wh(100vw, auto);
  @include border-1px(top);
  position: fixed;
  bottom: 0;
  background: #fff;
  nav {
    @include wh(100vw, auto);
    @include flex();
    a {
      @include flex(column, center, center);
      flex: 1;
      text-align: center;
      font-size: $font-size-m;
      padding: 12px 0;
      color: $color-grey;
      position: relative;
      span {
        margin-top: 4px;
      }
      .active {
        display: none;
      }
      &.active {
        color: $color-primary;
        .default {
          display: none;
        }
        .active {
          display: block;
        }
      }
      .count {
        width: auto;
        min-width: 40px;
        height: 40px;
        background: $color-primary;
        color: #fff;
        border-radius: 40px;
        line-height: 40px;
        font-size: 24px;
        position: absolute;
        top: -0;
        right: 40px;
      }
    }
  }
}
</style>
