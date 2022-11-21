import service from '@/utils/service'

const api = {
  user: {
    message_code: (params) => service.get('/user/message_code', params),
    login: (params) => service.post('/user/login', params),
    info: () => service.get('/user/info')
  },
  home: {
    banner: () => service.get('/home/banner'),
    menu: () => service.get('/home/menu'),
    nav: () => service.get('/home/nav')
  },
  product: {
    list: (params) => service.get('/product/list', params),
    classify: () => service.get('/product/classify')
  },
  search: {
    keyword: (params) => service.get('/search/keyword', params)
  },
  address: {
    create: (params) => service.post('/address', params),
    select: () => service.get('/address'),
    delete: (id) => service.delete(`/address/${id}`),
    update: (id, params) => service.put(`/address/${id}`, params)
  },
  car: {
    add: (params) => service.post('car/add', params),
    list: () => service.get('car/list'),
    update: (id, params) => service.put(`/car/product/${id}`, params),
    delete: (id) => service.delete(`/car/product/${id}`),
    updateAll: (params) => service.put('/car/product', params)
  }
}

export default {
  ...api,
  install (Vue) {
    Vue.prototype.$api = api
  }
}
