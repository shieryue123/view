<template>
  <div class="info-group">
    <div
      v-for="(item, index) in record"
      :key="index"
      class="info-card"
      :style="{width: 100 / column + '%'}"
    >
      <div class="bg" :style="{backgroundColor: item.color}"></div>
      <h3>较上日<b :style="{color: item.color}">{{item.today}}</b></h3>
      <output :style="{color: item.color}">{{item.num}}</output>
      <p>
        {{item.title}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NumInfo',
  props: {
    column: {
      type: Number,
      default: 0
    },
    record: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.info-group {
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  overflow: hidden;
  flex-wrap: wrap;
  .info-card {
    width: 33.33333%;
    flex-shrink: 0;
    position: relative;
    text-align: center;
    padding: 10px 0;
    border-right: 1px solid #fff;
    margin-bottom: 1px;
    .bg {
      opacity: 0.1;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
    h3 {
      color: #7c7c7c;
      font-size: 12px;
      font-weight: normal;
    }
    output {
      font-size: 18px;
      padding: 5px 0;
      font-weight: bold;
      display: block;
    }
    p {
      font-size: 12px;
      color: #222;
    }
  }
}
</style>
