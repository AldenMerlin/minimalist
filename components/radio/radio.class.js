import MnCheckbox from '../checkbox/checkbox.class.js'
import evaluate from 'evaluate-string'

export default class MnRadio extends MnCheckbox {
  constructor(self) {
    self = super(self)
    return self
  }

  connectedCallback() {
    this.innerHTML = ''
    this.setStyle()
    super._setLabel()
    this.setInput()
    this._setCustomInput()
    this._setForm()
    // this.checked = this.hasAttribute('checked')
    this.disabled = this.hasAttribute('disabled')
    this.readonly = this.hasAttribute('readonly')
    this.name = this.hasAttribute('name')
    this.setValidations()
  }

  setStyle() {
    this.classList.add('mn-radio')
    this.classList.add('mn-option')
  }

  setInput() {
    this.input = document.createElement('input')
    this.input.setAttribute('type', 'radio')
    this.label.appendChild(this.input)

    this.input.addEventListener('change', (event) => {
      this.checked
        ? this.setAttribute('checked', '')
        : this.removeAttribute('checked')

      this.options.forEach(option => {
        if (option !== event.target.closest('mn-radio')) {
          option.removeAttribute('checked')
          option.input.checked = false
        }

        option.form && option.form.classList && option.form.classList.contains('submitted')
          ? option.validate()
          : null
      })
    })
  }

  _setCustomInput() {
    const input = document.createElement('div')
    input.classList.add('input')

    this.label.appendChild(input)
  }

  setValidations() {
    this.validations = {
      required: () => !this.value,
    }
  }

  get options() {
    const name = this.getAttribute('name')
      ? `[name="${this.getAttribute('name')}"]`
      : ':not([name])'

    return Array.from(this.form.querySelectorAll(`.mn-radio${name}`))
  }

  get value() {
    const value = this
      .options
      .filter(option => option.checked)
      .map(option => option.hasAttribute('value')
        ? evaluate(option.getAttribute('value'))
        : option.getAttribute('placeholder')
      )

    return value[0]
  }

  set value(value) {
    this.options.forEach(option => {
      option.checked = false
    })

    const option = this.options.find(option => evaluate(option.getAttribute('value')) === value)

    if (option) {
      option.checked = true
    }
  }
}

window.customElements.define('mn-radio', MnRadio)
