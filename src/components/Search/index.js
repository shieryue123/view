import SearchBar from './SearchBar'
import SearchOption from './SearchOption'

export default {
  install (Vue) {
    Vue.component('SearchBar', SearchBar)
    Vue.component('SearchOption', SearchOption)
  }
}
