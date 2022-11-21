const scroll = {
  mounted () {
    this.initEvents()
  },
  methods: {
    initEvents () {
      window.addEventListener('scroll', (e) => {
        const windowHeight = window.innerHeight
        const bodyHeight = document.body.clientHeight
        const scrollY = window.scrollY
        this.$options.onScroll && this.$options.onScroll.forEach((item) => {
          item.call(this)
        })
        if (bodyHeight - scrollY <= windowHeight) {
          console.log(this.$options)
          this.$options.onReachBottom && this.$options.onReachBottom.forEach((item) => {
            item.call(this)
          })
        }
      }, false)
    }
  }
}

export default scroll
