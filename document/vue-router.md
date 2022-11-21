## 路由配置
new VueRouter(options)


options: {
  scrollBehavior: (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  mode: 'history', // history || hash
  routes: [routeConfig] // 路由规则
}

routeConfig: {
  path: '' // 路由路径
  component: Component, // 对应组件（容器组件）
  meta: {}  // 额外信息，自定义信息
  children: []  // 子路由
}

## 路由路径
父路由 path: '/aa'
子路由 path: '/bb' 访问 /bb    || path: 'bb'  访问 /aa/bb
动态路由: path: '/bb/:id'

## 路由跳转
两种方法：push， replace
两种形式：api形式使用$router   组件形式 route-link

## 路由传参
param：需要在动态路由中定义参数名称，在对应页面使用$route.params 获取，一般情况下必传参数使用params，因为他会影响路由的加载，包含在路由路径之中

query：query string params，查询参数，不影响路由的加载，包含路由路径之后，以？分割多个参数直接使用&分割，在对应页面使用$route.query获取
props


## 路由拦截

## 实现原理

