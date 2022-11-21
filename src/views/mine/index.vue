<template>
  <div>
    我的 {{userInfo.name}}
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'mine',
  computed: {
    ...mapState('user', ['userInfo'])
  }
}
</script>

<style lang="scss" scoped>

</style>
