<template>
  <div class="loading">
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  div {
    margin: auto;
    z-index: 1004;
    width: 140px;
    height: 140px;
    background-image: url(https://img.dmallcdn.com//dshop/201903/40208262-8001-4c19-ad20-370a039ed243);
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: auto 140px;
    animation: loading .9s steps(25) infinite;
  }
}

@keyframes loading {
  100% {
    background-position: -3500px;
  }
}
</style>
