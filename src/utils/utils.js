
export const trim = (str) => {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

export const offset = (dom) => {
  let top = 0
  let left = 0
  let el = dom

  while (el.offsetParent) {
    top += el.offsetTop
    left += el.offsetLeft
    el = el.offsetParent
  }

  return {
    top: top,
    left: left
  }
}

export const debounce = (fn, delay) => {
  let time = ''
  return function (...rest) {
    clearTimeout(time)
    time = setTimeout(() => {
      fn.apply(this, rest)
    }, delay)
  }
}
