<template>
  <div class="menu-wrap">
    <a
      class="menu-item"
      v-for="(item, index) in menu"
      :key="index"
      href="javascript:;"
    >
      <img :src="item.icon" />
      <label>{{ item.title }}</label>
    </a>
  </div>
</template>

<script>
export default {
  name: 'ShortcutMenu',
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-wrap {
  @include wh(100%, 312px);
  @include border-1px(bottom);
  display: grid;
  grid-template-columns: repeat(5, 20%);
  grid-template-rows: repeat(2, 50%);
  justify-items: center;
  align-items: center;
  .menu-item {
    @include flex(column, center, center);
    img {
      width: 100px;
      margin-bottom: 10px;
    }
    label {
      font-size: 26px;
      color: #999999;
    }
  }
}
</style>
