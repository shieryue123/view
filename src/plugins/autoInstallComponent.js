const components = require.context('@/components', true, /^\.\/(\w*\/)+index\.(vue|js)$/)

export default (Vue) => {
  components.keys().forEach(item => {
    const component = components(item).default
    if (component.install) {
      Vue.use(component)
    } else {
      Vue.component(component.name, component)
    }
  })
}
