import MnComponent from '../component/component.class.js'

class MnImage extends MnComponent {
  connectedCallback() {
    super.empty()
    this.setStyle()
    super.setChildren('img')
    this.setPerspective()
    super.setAttributes()
  }

  static get observedAttributes() {
    return [
      'src',
    ]
  }

  setStyle() {
    this.classList.add('mn-image')
  }

  setPerspective() {
    this.addEventListener('mouseenter', applyPerspective)
    this.addEventListener('mousemove', applyPerspective)

    function applyPerspective(event) {
      const {width, height, left, top} = this.getBoundingClientRect()
      const {clientX, clientY} = event

      const percentX = (clientX - left) / width
      const percentY = (clientY - top) / height
      const angles = 20
      const rotateY = (angles * (-percentX * 2)) + angles
      const rotateX = (angles * (percentY * 2)) - angles

      this.style.setProperty('--rotate-y', `${rotateY || 0}deg`)
      this.style.setProperty('--rotate-x', `${rotateX || 0}deg`)
    }
  }

  get src() {
    return this.imgChild.src || undefined
  }

  set src(value = '') {
    this.imgChild.src = value
  }
}

window.customElements.define('mn-image', MnImage)

export default MnImage
