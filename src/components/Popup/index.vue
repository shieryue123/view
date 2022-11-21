<template>
  <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    appear
  >
    <div
      v-show="visible"
      class="dialog-wrap"
    >
      <transition
        enter-active-class="animated slideInUp"
        leave-active-class="animated slideOutDown"
      >
        <div class="dialog-box" v-show="visible">
          <header>
            <h2 v-show="title">
              {{ title }}
            </h2>
            <div
              href="javascript:;"
              class="close"
              @click="close"
            ><icon name="close" :size="50" /></div>
          </header>
          <div class="content">
            <slot></slot>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Popup',
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
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    width: 100%;
    max-height: 80%;
    min-height: 100px;
    position: absolute;
    bottom: 0;
    header {
      @include wh(100vw, 88px);
      @include flex(row, center, space-between);
      line-height: 88px;
      h2 {
        color: #333;
        margin-bottom: 10px;
        font-size: 28px;
        font-weight: normal;
        padding: 0 20px;
      }
      .close {
        @include wh(88px, 88px);
        @include flex(row, center, center);
      }
    }
    .content {
      // min-height: 600px;
      max-height: 600px;
      overflow: auto;
    }
  }
}
</style>
