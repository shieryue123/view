<template>
  <button class="btn" :class="newClass" @click.prevent="clickCallback">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'ElButton',
  props: {
    type: {
      validator: function (value) {
        return ['primary', 'default'].filter(item => item === value).length >= 1
      },
      default: 'default'
    },
    radius: {
      type: Boolean,
      default: false
    },
    transparent: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    newClass () {
      return {
        [this.type]: true,
        radius: this.radius,
        transparent: this.transparent
      }
    }
  },
  methods: {
    clickCallback (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  @include wh(100%, 82px);
  border: 0;
  font-size: 28px;
  outline: none;
  &.primary {
    background-image: linear-gradient(160deg, $color-primary,#ff9030);
    // background: $color-primary;
    color: #fff;
    box-shadow: 0 4px 8px 0 rgba(254,100,38,.3);
  }
  &.default {
    background: #fff;
    color: #333;
  }
  &.radius {
    border-radius: 82px;
  }
  &.transparent {
    &.primary {
      border:1px solid $color-primary;
      background: transparent;
      color: $color-primary;
      box-shadow: none;
    }
    &.default {
      background: #fff;
      color: #333;
    }
  }
  &:disabled {
    opacity: 0.5;
    filter: grayscale(100%);
    filter: gray;  /* IE */
  }
}
</style>
