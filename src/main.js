import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import autoInstallComponent from './plugins/autoInstallComponent'
import autoDirectives from './plugins/autoDirectives'
import api from './api'

import './utils/rem'
import './assets/css/rest.css'
import './assets/css/animate.css'

Vue.config.productionTip = false
Vue.use(autoInstallComponent)
Vue.use(autoDirectives)
Vue.use(api)

const strats = Vue.config.optionMergeStrategies
strats.onReachBottom = strats.created
strats.onScroll = strats.created

new Vue({
  router,
  store,
  beforeCreate () {
    console.log(this, 'bbbb', this.constructor.options)
  },
  render: h => h(App)
}).$mount('#app')
