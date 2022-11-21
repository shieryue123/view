<template>
  <div class="collapse-item">
    <a
      href="javascript:;"
      @click="show"
    >{{ title }}</a>
    <div v-show="isShow">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollapseItem',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showMenu: false,
      index: 0
    }
  },
  computed: {
    isShow () {
      if (this.$parent.accordion) {
        return this.$parent.showIndex === this.index && this.showMenu
      } else {
        return this.showMenu
      }
    }
  },
  methods: {
    show () {
      if (this.$parent.accordion) {
        this.$parent.showIndex = this.index
        this.showMenu = !this.showMenu
      } else {
        this.showMenu = !this.showMenu
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.collapse-item {
  a {
    width: 100%;
    background: #f8f8f8;
    border-bottom: 1px solid #eee;
    height: 42px;
    display: block;
    line-height: 42px;
    color: #222;
    font-size: 14px;
    padding: 0 20px;
  }
}
</style>
