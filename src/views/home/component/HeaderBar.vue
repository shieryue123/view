<template>
  <header class="header-bar">
    <div>
      <router-link to="/address" class="location">
        <icon name="location" :size="32" />
        <span>送至：{{position.formattedAddress}}</span>
        <icon name="arrow" :size="32" class="arrow" />
      </router-link>
    </div>
    <div>
      <router-link to="/search"><icon name="search" :size="32" /></router-link>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HeaderBar',
  computed: {
    ...mapState('user', ['position'])
  }
}
</script>

<style lang="scss" scoped>
// keyframes loading{100%{background-position:-1750px 0}}
.header-bar {
  @include wh(100%, 98px);
  @include flex(row, center, space-between);
  @include border-1px(bottom);
  padding: 0 20px;
  font-size: 24px;
  a {
    color: #999999;
    font-weight: normal;
  }
  .arrow {
    transform: rotate(180deg);
  }
  .location {
    @include flex(row, center, center);
  }
  animation:loading .9s steps(25) infinite
}
</style>
