<template>
  <div class="message" :class="[type]">{{content}}</div>
</template>

<script>
export default {
  name: 'message',
  props: {
    content: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'info'
    }
  },
  mounted () {
    setTimeout(() => {
      this.$destroy()
    }, 3000)
  },
  destroyed () {
    document.body.removeChild(this.$el)
  }
}
</script>

<style lang="scss" scoped>
.message {
  display: block;
  position: fixed;
  top: 0;
  font-size: 24px;
  padding: 20px 0;
  width: 100%;
  text-align: center;
  &.error {
     background: $color-primary;
     color: #fff;
  }
  &.info {
     background: #fff;
     color: #ccc;
  }
}
</style>
