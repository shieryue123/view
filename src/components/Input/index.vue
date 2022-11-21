<template>
  <input type="text" v-model="newVal" />
</template>

<script>
import { trim } from '@/utils/utils'
const strategy = {
  phone: {
    format (val) {
      return trim(val.replace(/(\d{3})(.{1,4})(.{0,4})(.{0,})/, '$1 $2 $3'))
    },
    clear (val) {
      return val.replace(/\s/g, '')
    }
  },
  code: {
    format (val) {
      return trim(val.replace(/(\d{3})(\d{0,3})(\d{0,})/, '$1-$2'))
    },
    clear (val) {
      return val.replace(/-/g, '')
    }
  }
}

export default {
  name: 'ElInput',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  watch: {
    value (newVal) {
      this.val = newVal
    },
    val (newVal) {
      this.$emit('input', newVal)
    }
  },
  data () {
    return {
      val: this.value || ''
    }
  },
  computed: {
    newVal: {
      get () {
        return strategy[this.type] ? strategy[this.type].format(this.val) : this.val
      },
      set (val) {
        this.val = strategy[this.type] ? strategy[this.type].clear(val) : val
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
