import Icon from './Icon'

export default {
  install (Vue) {
    const files = require.context('@/assets/icon', true, /\.svg$/)
    files.keys().forEach(files)
    Vue.component('icon', Icon)
    // console.log(files.keys(), 'asad')
  }
}
