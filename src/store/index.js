import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import car from './car'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    car
  }
})
