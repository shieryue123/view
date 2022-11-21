const storage = {
  getItem (key) {
    let value = localStorage.getItem(key)
    if (value) {
      value = JSON.parse(value)
      if (value.options.maxAge) {
        if (+new Date() - value.options.createTime <= value.options.maxAge) {
          return value.value
        } else {
          localStorage.removeItem(key)
          return null
        }
      } else {
        return value.value
      }
    }
    return null
  },
  setItem (key, value, options) {
    const obj = {
      value,
      options: {
        createTime: +new Date(),
        ...options
      }
    }
    localStorage.setItem(key, JSON.stringify(obj))
  },
  removeItem (key) {
    localStorage.removeItem(key)
  }
}

export default storage
