import Vue from 'vue'
import VueRouter from 'vue-router'
import cookie from '@/utils/cookie'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SwitchTab',
    redirect: '/home',
    component: () => import('@/views/switchTab'),
    children: [
      {
        path: '/home',
        component: () => import('@/views/home'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/classify',
        component: () => import('@/views/classify'),
        meta: {
          title: '分类'
        }
      },
      {
        path: '/car',
        component: () => import('@/views/car'),
        meta: {
          title: '购物车',
          authority: true
        }
      },
      {
        path: '/mine',
        component: () => import('@/views/mine'),
        meta: {
          title: '我的',
          authority: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/search',
    component: () => import('@/views/search'),
    meta: {
      title: '搜索'
    }
  },
  {
    path: '/geolocation',
    component: () => import('@/views/geolocation'),
    meta: {
      title: '定位'
    }
  },
  {
    path: '/address',
    component: () => import('@/views/address'),
    meta: {
      title: '选择位置'
    }
  },
  {
    path: '/edit/address',
    component: () => import('@/views/editAddress'),
    meta: {
      title: '编辑地址',
      authority: true
    }
  },
  {
    path: '/map',
    component: () => import('@/views/map'),
    meta: {
      title: '选择位置'
    }
  },
  {
    path: '/product/:id',
    component: () => import('@/views/product'),
    meta: {
      title: '商品详情'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const whitePath = [
  '/geolocation',
  '/address'
]

router.beforeEach((to, from, next) => {
  const state = router.app.$store.state
  console.log(state)
  if (!state.user.position && whitePath.indexOf(to.path) === -1) {
    next({
      path: '/geolocation',
      query: {
        callbackUrl: to.path
      }
    })
  } else {
    if (to.meta.authority) {
      const token = cookie.get('token')
      if (token) {
        next()
      } else {
        next({
          path: '/login',
          query: {
            callbackUrl: to.path
          }
        })
      }
    } else {
      next()
    }
  }
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
