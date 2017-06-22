const {HTMLElement} = window

module.exports = class MnForm extends HTMLElement {
  constructor() {
    self = super(self)
    return self
  }

  connectedCallback() {
    this._setStyle()
    this._setSubmit()
    this._setAttributeDisabled()
  }

  static get observedAttributes() {
    return [
      'name',
      'disabled',
      'readonly',
    ]
  }

  attributeChangedCallback(name, old, value) {
    this[name] = value
  }

  _setStyle() {
    this.classList.add('mn-form')
  }

  _setSubmit() {
    document.addEventListener('keydown', (event) => {
      const enter = event.key === 'Enter'
      const srcElementInsideForm = event.target.closest('mn-form')
      if (enter && srcElementInsideForm) {
        this.submit()
      }
    })

    Array
      .from(this.querySelectorAll('button[type="submit"]:not([disabled])'))
      .forEach(button => {
        button.addEventListener('click', () => this.submit())
      })
  }

  _setAttributeDisabled() {
    this.disabled = this.hasAttribute('disabled')
  }

  _setAttributeDisabled() {
    this.readonly = this.hasAttribute('readonly')
  }

  validate() {
    this.inputs
      .filter(input => !input.hasAttribute('disabled') && !input.hasAttribute('readonly'))
      .forEach(input => input.validate())

    const isInvalid = !this.inputs.some(input => input.classList.contains('invalid'))
    return isInvalid
  }

  get inputs() {
    return Array.from(this.querySelectorAll('.mn-input'))
  }

  get data() {
    const data = {}

    this.inputs
      .forEach(input => {
        const name = input.getAttribute('name')

        if (name) {
          data[name] = input.value
        }
      })

    return data
  }

  set name(name) {
    if (name && typeof name === 'string') {
      window[name] = this
    }
  }

  set disabled(value) {
    this.inputs
      .forEach(input => {
        this.hasAttribute('disabled')
          ? input.setAttribute('disabled', 'true')
          : input.removeAttribute('disabled')
      })
  }

  set readonly(value) {
    this.inputs
      .forEach(input => {
        this.hasAttribute('readonly')
          ? input.setAttribute('readonly', 'true')
          : input.removeAttribute('readonly')
      })
  }

  submit() {
    this.classList.add('submitted')
    const isValid = this.validate()
    const event = new Event('submit')
    event.data = this.data

    if (isValid) {
      this.dispatchEvent(event)
    }
  }
}
