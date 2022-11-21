<template>
  <div class="form-item">
    <label v-if="label">{{ label }}</label>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormItem',
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.form-item {
  @include wh(100%, 120px);
  @include flex(row, center, center);
  @include border-1px(bottom);
  padding: 20px;
  background: #fff;
  label {
    font-size: 28px;
    color: grey;
    width: 140px;
  }
  .content {
    @include flex();
    flex: 1;
    /deep/ input {
      flex: 1;
      height: 100%;
      line-height: 80px;
      padding: 0;
      border: 0;
      outline: none;
    }
  }
}
</style>
