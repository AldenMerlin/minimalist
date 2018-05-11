import MnInput from '../input/input.class.js'

class MnNumber extends MnInput {
  connectedCallback() {
    super.empty()
    super.setStyle()
    this.setStyle()
    super.setChildren('label')
    super.setChildren('input')
    this.setInputEvents()
    this.setTransforms()
    this.setAttributes()
  }

  setStyle() {
    this.classList.add('mn-number')
  }

  static get observedAttributes() {
    return [
      'label',
      'value',
      'name',
      'placeholder',
      'disabled',
      'readonly',
      'autofocus',
      'currency',
      'precision',
    ]
  }

  get value() {
    const number = +this.inputChild.value.replace(/,/g, '.')
    const isNumber = this.inputChild.value && !Number.isNaN(number)
    return isNumber
      ? number
      : undefined
  }

  set value(value = '') {
    this.inputChild.value = value
    this.inputChild.dispatchEvent(new Event('change'))
    this.classList.toggle('has-value', this.hasValue)
  }

  setTransforms()  {
    const transform = (e) => {
      try {
        const value = eval(this.inputChild.value.replace(/,/g, '.'))
        const isNumber = typeof value === 'number'
        this.inputChild.value = isNumber
          ? String(value).replace(/\./g, ',')
          : ''

        const isCurrency = this.hasAttribute('currency')
          && this.getAttribute('currency') !== 'false'
        const hasPrecision = this.hasAttribute('precision')
        const precision = this.getAttribute('precision') || 0

        switch (true) {
          case isCurrency:
            this.inputChild.value = value.toFixed(precision || 2).replace(/\./g, ',')
            break

          case hasPrecision:
            this.inputChild.value = value.toFixed(precision).replace(/\./g, ',')
            break
        }
      } catch (e) {
        this.inputChild.value = ''
      }
    }

    this.inputChild.addEventListener('change', transform)
    this.inputChild.addEventListener('blur', transform)
  }

  setInputEvents() {
    super.setInputEvents()

    const incrementOrDecrement = (event) => {
      const isReadonly = this.hasAttribute('readonly') && this.getAttribute('readonly') !== 'false'
      const stepValue = +this.getAttribute('step') || 1
      const isArrowUp = event.key === 'ArrowUp'
      const isArrowDown = event.key === 'ArrowDown'

      if (!isReadonly && (isArrowUp || isArrowDown)) {
        event.preventDefault()
        const step = event.shiftKey
          ? stepValue * 10
          : event.altKey
            ? stepValue / 10
            : stepValue

        const previousValue = this.value || 0
        const precision = String(step).replace(/\d+\./, '').length
        let value

        switch (event.key) {
          case 'ArrowUp':
            value = previousValue + step
            break
          case 'ArrowDown':
            value = previousValue - step
            break
        }

        this.value = +(value).toFixed(precision)
      }
    }

    this.inputChild.addEventListener('keydown', incrementOrDecrement)
  }
}

window.customElements.define('mn-number', MnNumber)

export default MnNumber
