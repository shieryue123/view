import form from './form'
import formItem from './formItem'

export default {
  install (Vue) {
    Vue.component('ElForm', form)
    Vue.component('ElFormItem', formItem)
  }
}
