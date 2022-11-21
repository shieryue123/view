<template>
  <div class="menu" :class="{
    scrollX: scrollX
  }">
    <nav>
      <template v-for="(item, index) in options" >
        <router-link v-if="item.path" @click.native="change(index, $event)" :to="item.path" :key="forkey === 'index' ? index : item[forkey]">
          {{item.text}}
        </router-link>
        <a v-else :key="forkey === 'index' ? index : item[forkey]" :class="{
          active: activeIndex === index
        }" @click="change(index, $event)" href="javascript:;">
          {{item.text}}
        </a>
      </template>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'TabMenu',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    scrollX: {
      type: Boolean,
      default: true
    },
    forkey: {
      type: String,
      default: 'index'
    }
  },
  data () {
    return {
      activeIndex: 0
    }
  },
  watch: {
    options () {
      this.activeIndex = 0
    }
  },
  methods: {
    change (index, e) {
      const el = e.target
      const vw = window.innerWidth
      this.activeIndex = index
      this.$el.scrollTo(el.offsetLeft - vw / 2 + el.clientWidth / 2, 0)
      this.$emit('change', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  width: 100%;
  height: 92px;
  line-height: 92px;
  overflow: auto;
  nav {
    display: flex;
    flex-wrap: nowrap;
    a {
      line-height: 92px;
      padding: 0 20px;
      display: block;
      flex: 1;
      font-size: 26px;
      text-align: center;
      color: #4A4A4A;
      word-break: keep-all;
      &.active {
        color: $color-primary;
      }
    }
  }
  &.scrollX {
    nav {
      a {
        flex-shrink: 0;
        flex: initial;
      }
    }
  }
}
</style>
