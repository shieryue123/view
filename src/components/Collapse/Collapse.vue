<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'collapse',
  props: {
    accordion: Boolean
  },
  data () {
    return {
      showIndex: -1
    }
  },
  watch: {
    showIndex (newValue) {
      this.$children.forEach((child, index) => {
        if (newValue !== index) {
          child.showMenu = false
        }
      })
    }
  },
  mounted () {
    this.$children.forEach((child, index) => {
      child.index = index
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
