import MnComponent from '../component/component.class.js'

class MnForm extends MnComponent {
  connectedCallback() {
    this.setStyle()
    super.setAttributes()
  }

  static get observedAttributes() {
    return [
      'disabled',
      'readonly',
    ]
  }

  setStyle() {
    this.classList.add('mn-form')
  }

  get disabled() {
    return Boolean(this.getAttribute('disabled'))
  }

  set disabled(value) {
    if (value !== this.disabled) {
      this.setAttribute('disabled', value)
    }

    Array
      .from(this.querySelectorAll('.mn-input'))
      .forEach(input => input.disabled = value)
  }

  get readonly() {
    return Boolean(this.getAttribute('readonly'))
  }

  set readonly(value) {
    if (value !== this.readonly) {
      this.setAttribute('readonly', value)
    }

    Array
      .from(this.querySelectorAll('.mn-input'))
      .forEach(input => input.readonly = value)
  }
}

window.customElements.define('mn-form', MnForm)

export default MnForm
