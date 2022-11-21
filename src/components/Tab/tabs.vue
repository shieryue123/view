<template>
  <div class="tabs">
    <nav>
      <a
        v-for="(child, index) in children"
        href="javascript:;"
        :key="index"
        :class="{active: activeIndex === index}"
        @click="handleClickTab(index)"
      >{{child.title}}</a>
    </nav>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tabs',
  props: {
    selected: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      children: [],
      activeIndex: this.selected
    }
  },
  watch: {
    selected (newValue) {
      this.activeIndex = newValue
    }
  },
  mounted () {
    console.log(this.$children)
    this.children = this.$children.map((child, index) => {
      child.index = index
      return child
    })
  },
  methods: {
    handleClickTab (index) {
      this.activeIndex = index
      this.$emit('update:selected', index)
      // this.$emit('input', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  nav {
    width: 100%;
    height: 42px;
    display: flex;
    background-color: #ddecff;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    overflow: hidden;
    a {
      flex: 1;
      text-align: center;
      line-height: 42px;
      color: #445063;
      border-right: 1px solid #fff;
      font-size: 14px;
      position: relative;
      &.active {
        background: #fff;
        &:after {
          content: '';
          background: url('https://mat1.gtimg.com/news/feiyanarea/tabindex_l.png');
          background-size: 100% 100%;
          width: 25px;
          height: 42px;
          position: absolute;
          top: 0;
          left: -12px;
          display: block;
        }
        &:before {
          content: '';
          background: url('https://mat1.gtimg.com/news/feiyanarea/tabindex_r.png');
          background-size: 100% 100%;
          width: 25px;
          height: 42px;
          position: absolute;
          top: 0;
          right: -12px;
          display: block;
        }
      }
    }
  }
}
</style>
