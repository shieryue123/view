import Loading from './Loading'

export default {
  install (Vue) {
    let component = ''
    Vue.prototype.$loading = {
      show () {
        const ComponentClass = Vue.extend(Loading)
        component = new ComponentClass()
        component.$mount()
        document.body.appendChild(component.$el)
      },
      hide () {
        component.$destroy()
        document.body.removeChild(component.$el)
      }
    }
  }
}
