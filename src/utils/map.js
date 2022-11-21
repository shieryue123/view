import AMap from 'AMap'

let autoComplete
AMap.plugin('AMap.Autocomplete', () => {
  var autoOptions = {
    city: '全国'
  }
  autoComplete = new AMap.Autocomplete(autoOptions)
})

export default {
  geolocation (options) {
    return new Promise((resolve, reject) => {
      AMap.plugin('AMap.Geolocation', () => {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 10000,
          ...options
        })
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', (res) => {
          resolve(res)
        })
        AMap.event.addListener(geolocation, 'error', (error) => {
          reject(error)
        })
      })
    })
  },
  autocomplete (keyword) {
    return new Promise((resolve) => {
      autoComplete.search(keyword, (status, result) => {
        resolve(result)
      })
    })
  }
}
