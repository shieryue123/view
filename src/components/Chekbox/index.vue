<template>
  <label class="checkbox">
    <input type="checkbox" :checked="checked" @change="change" />
    <span class="box">
      <icon name="checked" :size="30" />
    </span>
  </label>
</template>

<script>
export default {
  name: 'chekbox',
  props: {
    checked: Boolean
  },
  methods: {
    change () {
      this.$emit('change')
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox {
  input {
    display: none;
    &:checked {
      & + span {
        @include flex(row, center, center);
        background: #f00;
        border-color: #f00;
        /deep/ .icon{
          display: block;
        }
      }
    }
  }
  span {
    @include wh(30px, 30px);
    display: inline-block;
    vertical-align: middle;
    border-radius: 100%;
    border:1px solid #ccc;
    /deep/ .icon{
      display: none;
    }
  }
}
</style>
