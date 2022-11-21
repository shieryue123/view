const directives = require.context('@/directives', true, /.js$/)

console.log(directives.keys())
export default (Vue) => {
  directives.keys().forEach(item => {
    const directive = directives(item).default
    const name = item.replace('./', '').replace('.js', '')
    Vue.directive(name, directive)
  })
}
