import cookie from '@/utils/cookie'
import api from '@/api'
import storage from '@/utils/storage'

const user = {
  namespaced: true,
  state: {
    token: cookie.get('token') || '',
    userInfo: {},
    position: storage.getItem('position') || '',
    address: []
  },
  mutations: {
    SET_USER_INFO (state, payload) {
      state.userInfo = payload
    },
    SET_USER_LOCATION (state, payload) {
      state.position = payload
      storage.setItem('position', payload, {
        maxAge: 1000 * 60 * 60 * 2
      })
    },
    SET_ADDRESSS (state, payload) {
      state.address = payload
    }
  },
  actions: {
    async getUserInfo ({ commit, dispatch }) {
      const res = await api.user.info()
      dispatch('address')
      dispatch('car/list', null, { root: true })
      commit('SET_USER_INFO', res.data)
    },
    async address ({ commit }) {
      const res = await api.address.select()
      commit('SET_ADDRESSS', res.data)
    },
    async login ({ dispatch }, params) {
      await api.user.login(params)
      dispatch('getUserInfo')
    }
  }
}

export default user
