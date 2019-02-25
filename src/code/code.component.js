import Minimalist, {component} from '../minimalist/minimalist.class.js'

@component('mn-code')
class Code extends Minimalist {
  string = this.innerHTML

  beforeRender() {
    this.classList.add('mn-code')
  }

  render() {
    return '<canvas />'
  }

  afterRender() {
    this.canvas = this.querySelector('canvas')
    this.context = this.canvas.getContext('2d')
    this.setRetinaContext()
    this.setBackground()
    this.setText()
  }

  setBackground() {
    const {canvas, context} = this
    context.fillStyle = this.getStyleVar('background-color')
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  getStyleVar(name) {
    return getComputedStyle(this).getPropertyValue(`--${name}`)
  }

  setText() {
    const {canvas, context} = this

    context.fillStyle = this.getStyleVar('color')
    context.font = `${this.getStyleVar('font-size')} ${'Helvetica'}`
    let lineHeightPosition = 30
    // context.fillText(this.string, 20, 20)
    // console.log(parse(this.string))

    this.string.split('\n').forEach(line => {
      lineHeightPosition += 20
      context.fillText(line, 20, lineHeightPosition)
    })

    // console.log(this.string.split('\n'))
  }

  setRetinaContext() {
    const isRetinaDisplay = window.devicePixelRatio === 2
    const {canvas, context} = this

    if (isRetinaDisplay) {
      canvas.width = this.offsetWidth * 2
      canvas.height = this.offsetHeight * 2
      canvas.style.width = canvas.width / 2
      canvas.style.height = canvas.height / 2

      context.scale(2, 2)
    }
  }
}

export default Code
