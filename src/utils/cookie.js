const cookie = {
  get (key) {
    const name = key + '='
    const decodedCookie = decodeURIComponent(document.cookie)
    const ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  },
  set (key, value, options) {
    let cookieText = ''
    cookieText += encodeURIComponent(key) + '=' + encodeURIComponent(value)
    for (const key in options) {
      cookieText += `; ${key}=` + options[key]
    }
    document.cookie = cookieText
  },
  clear () {
    document.cookie = ''
  },
  remove (key) {
    this.set(key, '', {
      maxAge: 0
    })
  }
}

export default cookie
