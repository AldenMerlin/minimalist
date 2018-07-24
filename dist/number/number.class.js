'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inputClass = require('../input/input.class.js');

var _inputClass2 = _interopRequireDefault(_inputClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MnNumber extends _inputClass2.default {
  connectedCallback() {
    super.empty();
    super.setStyle();
    this.setStyle();
    super.setChildren('label');
    super.setChildren('input');
    this.setInputEvents();
    this.setTransforms();
    this.setAttributes();
  }

  setStyle() {
    this.classList.add('mn-number');
  }

  static get observedAttributes() {
    return ['label', 'value', 'name', 'placeholder', 'disabled', 'readonly', 'autofocus', 'currency', 'precision', 'min', 'max'];
  }

  get value() {
    const number = +this.inputChild.value.replace(/,/g, '.');
    const isNumber = this.inputChild.value && !Number.isNaN(number);
    return isNumber ? number : undefined;
  }

  set value(value = '') {
    this.inputChild.value = value;
    this.inputChild.dispatchEvent(new Event('change'));
    this.classList.toggle('has-value', this.hasValue);
  }

  get min() {
    return this.labelChild.hasAttribute('min') ? +this.labelChild.getAttribute('min') : undefined;
  }

  set min(value) {
    value ? this.labelChild.setAttribute('min', value) : this.labelChild.removeAttribute('min');
  }

  get max() {
    return this.labelChild.hasAttribute('max') ? +this.labelChild.getAttribute('max') : undefined;
  }

  set max(value) {
    value ? this.labelChild.setAttribute('max', value) : this.labelChild.removeAttribute('max');
  }

  get validations() {
    return {
      required: super.validations.required,
      max: () => {
        return this.hasValue ? this.value > +this.getAttribute('max') : false;
      },
      min: () => {
        return this.hasValue ? this.value < +this.getAttribute('min') : false;
      }
    };
  }

  setTransforms() {
    const transform = e => {
      try {
        const value = eval(this.inputChild.value.replace(/,/g, '.'));
        const isNumber = typeof value === 'number';
        this.inputChild.value = isNumber ? String(value).replace(/\./g, ',') : '';

        const isCurrency = this.hasAttribute('currency') && this.getAttribute('currency') !== 'false';
        const hasPrecision = this.hasAttribute('precision');
        const precision = this.getAttribute('precision') || 0;

        switch (true) {
          case isCurrency:
            this.inputChild.value = value.toFixed(precision || 2).replace(/\./g, ',');
            break;

          case hasPrecision:
            this.inputChild.value = value.toFixed(precision).replace(/\./g, ',');
            break;
        }
      } catch (e) {
        this.inputChild.value = '';
      }
    };

    this.inputChild.addEventListener('change', transform);
    this.inputChild.addEventListener('blur', transform);
  }

  setInputEvents() {
    super.setInputEvents();

    const incrementOrDecrement = event => {
      const isReadonly = this.hasAttribute('readonly') && this.getAttribute('readonly') !== 'false';
      const stepValue = +this.getAttribute('step') || 1;
      const isArrowUp = event.key === 'ArrowUp';
      const isArrowDown = event.key === 'ArrowDown';

      if (!isReadonly && (isArrowUp || isArrowDown)) {
        event.preventDefault();
        const step = event.shiftKey ? stepValue * 10 : event.altKey ? stepValue / 10 : stepValue;

        const previousValue = this.value || 0;
        const precision = String(step).replace(/\d+\./, '').length;
        let value;

        switch (event.key) {
          case 'ArrowUp':
            value = previousValue + step;
            break;
          case 'ArrowDown':
            value = previousValue - step;
            break;
        }

        this.value = +value.toFixed(precision);
      }
    };

    this.inputChild.addEventListener('keydown', incrementOrDecrement);
  }
}

window.customElements.define('mn-number', MnNumber);

exports.default = MnNumber;