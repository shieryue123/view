import api from '@/api'

const user = {
  namespaced: true,
  state: {
    list: [],
    price: 0
  },
  getters: {
    count (state) {
      return state.list.reduce((prevValue, item, index) => {
        if (item.actived * 1 === 1) {
          return (prevValue += item.num)
        }
        return prevValue
      }, 0)
    }
  },
  mutations: {
    SET_CAR_LIST (state, payload) {
      state.list = payload
    },
    SET_CAR_PRICE (state, payload) {
      state.price = payload
    }
  },
  actions: {
    async add ({ commit, dispatch }, payload) {
      await api.car.add(payload)
      dispatch('list')
    },
    async list ({ commit }) {
      const res = await api.car.list()
      commit('SET_CAR_LIST', res.data)
      commit('SET_CAR_PRICE', res.price)
    },
    async update ({ dispatch }, payload) {
      await api.car.update(payload.id, payload.params)
      dispatch('list')
    },
    async delete ({ dispatch }, id) {
      await api.car.delete(id)
      dispatch('list')
    },
    async updateAll ({ dispatch }, payload) {
      await api.car.updateAll(payload)
      dispatch('list')
    }
  }
}

export default user
