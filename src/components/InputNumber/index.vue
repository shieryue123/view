<template>
  <div class="input-num">
    <a href="javascript:;" @click="reduce"><icon name="deduct" /></a>
    <output>{{ val }}</output>
    <a href="javascript:;" @click="add"><icon name="add" /></a>
  </div>
</template>

<script>
export default {
  name: 'InputNumber',
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      val: this.value
    }
  },
  watch: {
    val (newValue) {
      this.$emit('input', newValue)
      this.$emit('change', newValue)
    },
    value (newValue) {
      this.val = newValue
    }
  },
  methods: {
    add () {
      if (this.val + 1 <= this.min) {
        this.$emit('minChange')
      } else {
        this.val += 1
      }
    },
    reduce () {
      if (this.val - 1 <= this.min) {
        this.$emit('minChange')
      } else {
        this.val -= 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.input-num {
  line-height: 52px;
  @include flex(row, center, center);
  output {
    font-size: 24px;
    padding: 0 20px;
  }
}
</style>
