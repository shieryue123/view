import { debounce } from '@/utils/utils'

const eventCallback = debounce(function (expression, e) {
  const value = e.target.value
  this[expression] = value
}, 200)

export default {

  inserted (el, binding, vnode) {
    el.value = binding.value
    console.log(el, binding)
    el.addEventListener('input', eventCallback.bind(vnode.context, binding.expression))
  }
}
