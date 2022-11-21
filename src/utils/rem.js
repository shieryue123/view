const baseWidth = 375

function setFontSize () {
  const width = window.innerWidth
  const size = width / baseWidth * 50
  document.querySelector('html').style.fontSize = size + 'px'
}

setFontSize()

window.addEventListener('resize', setFontSize)
