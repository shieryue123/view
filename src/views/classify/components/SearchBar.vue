<template>
  <a href="javascript:;" class="search-bar">
    <icon name="search" :size="30" />
    <input type="search" placeholder="搜索校园超市商品" readonly />
  </a>
</template>

<script>
export default {
  name: 'SearchBar'
}
</script>

<style lang="scss" scoped>
.search-bar {
  @include wh(auto, 64px);
  @include flex(row, center, center);
  margin: 17px 30px;
  background: #F6F6F6;
  border-radius: 64px;
  padding: 0 20px;
  flex-shrink: 0;
  input {
    flex: 1;
    border: 0;
    outline: none;
    background: transparent;
    padding-left: 20px;
  }
}
</style>
