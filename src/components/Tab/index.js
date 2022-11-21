import tab from './tab'
import tabs from './tabs'

export default {
  install (Vue) {
    Vue.component('tab', tab)
    Vue.component('tabs', tabs)
  }
}
