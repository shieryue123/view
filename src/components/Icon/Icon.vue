<template>
  <svg class="icon" :style="style">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<script>
export default {
  name: 'icon',
  props: {
    name: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 52
    }
  },
  computed: {
    style () {
      return {
        width: this.size / 100 + 'rem',
        height: this.size / 100 + 'rem'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// .icon {
//   @include wh(52px, 52px);
// }
</style>
