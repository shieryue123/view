<template>
  <form class="form-wrap">
    <slot></slot>
  </form>
</template>

<script>
import regexp from './regexp'

export default {
  name: 'Form',
  props: {
    mode: {
      type: Object,
      default: () => ({})
    },
    rule: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    validate () {
      const data = this.mode
      const messages = []

      Object.keys(data).forEach((key) => {
        const rules = this.rule[key]
        rules.forEach(rule => {
          const value = data[key]
          if (rule.required && value === '') {
            messages.push(rule.message)
          } else if (rule.type && regexp[rule.type] && !regexp[rule.type].test(value)) {
            messages.push(rule.message)
          } else if (rule.regexp && !rule.regexp.test(value)) {
            messages.push(rule.message)
          }
        })
      })

      return new Promise((resolve, reject) => {
        if (messages.length >= 1) {
          reject(messages[0])
        } else {
          resolve(data)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-wrap {
  @include wh(100%, auto);
}
</style>
