import Message from './Message'

export default {
  install (Vue) {
    // Vue.component('message', Message)
    Vue.prototype.$message = {
      error (str) {
        const Component = Vue.extend(Message) // 组件类
        const example = new Component({
          propsData: {
            type: 'error',
            content: str
          }
        })
        example.$mount()
        document.body.appendChild(example.$el)
      },
      success (str) {
        console.log(str)
      },
      info (str) {
        console.log(str)
      }
    }
  }
}
