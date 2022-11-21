<template>
  <div
    v-show="visible"
    class="dialog-wrap"
  >
    <div class="dialog-box">
      <header>
        <h2 v-show="title">
          {{ title }}
        </h2>
        <a
          href="javascript:;"
          class="close"
          @click="close"
        ></a>
      </header>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    visible: Boolean,
    title: String
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-wrap {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  .dialog-box {
    background: #fff;
    border-radius: 8px;
    width: 80%;
    max-height: 80%;
    min-height: 100px;
    margin: auto;
    padding: 20px;
    position: relative;
    header {
      h2 {
        color: #005dff;
        margin-bottom: 10px;
      }
      .close {
        position: absolute;
        top: -40px;
        right: 0;
        width: 30px;
        height: 30px;
        background: url(https://mat1.gtimg.com/news/feiyannews/icon_pop_close.png);
        background-size: 100% 100%;
        display: block;
      }
    }
  }
}
/**
  1, 定位
  父：
    position: relative;
  子没有固定宽高：
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);

  2, flex；
  父:
    display: flex;
  子：
    margin: auto;

  3, flex
  父
    display: flex;
    justify-content: center;
    align-items: center;
  4，定位
    子
    postion: absolute;
    width: 100px;
    height: 100px;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;

  5，转换成table
 */
</style>
