<template>
  <div class="tab" v-show="index === $parent.activeIndex">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tab',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      index: 0
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
