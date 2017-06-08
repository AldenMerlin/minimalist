/* global describe, it, before, beforeEach */
const {expect, spy} = require('chai')
  .use(require('chai-dom'))
  .use(require('chai-colors'))
  .use(require('chai-style'))
  .use(require('chai-spies'))

let date // page object defined in method setPageObject
let component

describe('mn-date (webcomponent)', () => {
  before(loadComponent)
  beforeEach(cleanView)
  beforeEach(createComponent)
  beforeEach(setPageObject)

  describe('instance', () => {
    it('should work with a constructor', () => {
      const MnDate = window.customElements.get('mn-date')
      component = new MnDate()
      expect(component).to.be.instanceof(MnDate)
    })

    it('should work with document.createElement()', () => {
      const MnDate = window.customElements.get('mn-date')
      component = document.createElement('mn-date')
      expect(component).to.be.instanceof(MnDate)
    })
  })

  describe('component', () => {
    it('should have the .mn-date class', () => {
      expect(component).to.have.class('mn-date')
    })

    it('should contain a input property', () => {
      expect(component).to.have.property('input')
    })

    it('should contain a input child', () => {
      expect(component.querySelectorAll('input')).to.have.length(1)
    })
  })

  // all style specs need to be refactor, to better organization and readability
  describe('css style', () => {
    it('should have a inline-block display', () => {
      expect(component).to.have.style('display', 'flex')
    })

    it('should have a relative position', () => {
      expect(component).to.have.style('position', 'relative')
    })

    it('should have a margin', () => {
      expect(component).to.have.style('margin', '1.5em 0px 1em')
    })
  })

  describe('attribute name', () => {
    it('should define a form getter if parent form exist and has an id', () => {
      date.setAttribute('name', 'test')
      const {formID} = window
      expect(formID.test).to.be.equal(component)
    })

    it('should define a form getter if parent form exist and has a name', () => {
      date.setAttribute('name', 'test')
      const {formName} = window
      expect(formName.test).to.be.equal(component)
    })

    it('should undefine form getter (name) if component name was removed', () => {
      date.setAttribute('name', 'test')
      date.removeAttribute('name')
      const {formName} = window
      expect(formName.test).to.be.undefined
    })

    it('should undefine form getter (id) if component name was removed', () => {
      date.setAttribute('name', 'test')
      date.removeAttribute('name')
      const {formID} = window
      expect(formID.test).to.be.undefined
    })

    it('should redefine form getter (name) if component name changed', () => {
      date.setAttribute('name', 'test')
      date.setAttribute('name', 'test2')
      const {formName} = window
      expect(formName.test2).to.be.equal(component)
    })

    it('should redefine form getter (id) if component name changed', () => {
      date.setAttribute('name', 'test')
      date.setAttribute('name', 'test2')
      const {formID} = window
      expect(formID.test2).to.be.equal(component)
    })
  })

  describe('property placeholder', () => {
    it('should set the placeholder text in label', () => {
      date.setProperty('placeholder', 'test')
      expect(component).to.contain('label').with.text('test')
    })

    it('should set the placeholder text in label', () => {
      date.setProperty('placeholder', 'test1')
      date.setProperty('placeholder', 'test2')
      expect(component).to.contain('label').with.text('test2')
    })

    it('should set emtpy text if is undefined', () => {
      date.setProperty('placeholder', undefined)
      expect(component).to.contain('label').with.text('')
    })
  })

  describe('attribute placeholder', () => {
    it('should define a label as placeholder', () => {
      date.setAttribute('placeholder', 'test')
      expect(component).to.contain('label').with.text('test')
    })

    it('should change the text', () => {
      date.setAttribute('placeholder', 'test')
      date.setAttribute('placeholder', 'test2')
      expect(component).to.contain('label').with.text('test2')
    })

    it('should set empty text if is undefined', () => {
      expect(component).to.contain('label').with.text('')
    })

    it('should set empty text to label when attribute is removed', () => {
      date.setAttribute('placeholder', 'test')
      date.removeAttribute('placeholder')
      expect(component).to.contain('label').with.text('')
    })
  })

  describe('attribute readonly', () => {
    it('should define attribute in child number', () => {
      date.setAttribute('readonly', 'readonly')
      expect(component).to.contain('input').to.have.attribute('readonly')
    })

    it('should remove attribute from child input', () => {
      date.removeAttribute('readonly')
      expect(component).to.contain('input').not.have.attribute('readonly')
    })
  })

  describe('attribute disabled', () => {
    it('should define attribute in child input', () => {
      date.setAttribute('disabled')
      expect(component.input).to.have.attribute('disabled')
    })

    it('should remove attribute from child input', () => {
      date.setAttribute('disabled')
      date.removeAttribute('disabled')
      expect(component.input).to.not.have.attribute('disabled')
    })
  })

  describe('method validate()', () => {
    it('should be called on event keyup, if have a parent form.submitted', () => {
      component.closest('form').classList.add('submitted')
      const validate = spy.on(component, 'validate')
      component.input.dispatchEvent(new Event('keyup'))
      expect(validate).to.have.been.called()
    })

    it('should not called on event keyup, if not have a parent form.submitted', () => {
      const validate = spy.on(component, 'validate')
      component.input.dispatchEvent(new Event('keyup'))
      expect(validate).to.not.have.been.called
    })
  })

  describe('property value', () => {
    it('should return undefined by default', () => {
      expect(component).to.have.value(undefined)
    })

    it('should be undefined when it is setted string', () => {
      date.setProperty('value', 'teste')
      expect(component).to.have.value(undefined)
    })

    it('should be undefined when it is setted numbers', () => {
      date.setProperty('value', 123)
      expect(component).to.have.value(undefined)
    })

    it('should be undefined when it is setted number as string', () => {
      date.setProperty('value', '123')
      expect(component).to.have.value(undefined)
    })

    it('should be undefined when it is setted empty string', () => {
      date.setProperty('value', '')
      expect(component).to.have.value(undefined)
    })

    it('should be a ISOString setting a date', () => {
      date.setProperty('value', '2012-12-05')
      expect(component).to.have.value('2012-12-05T00:00:00.000Z')
    })

    it('should be a ISOString without hours using date constructor', () => {
      date.setProperty('value', new Date(2012, 11, 5, 18, 0))
      expect(component).to.have.value('2012-12-05T00:00:00.000Z')
    })

    it('should be a ISOString no setting hours using date constructor', () => {
      date.setProperty('value', new Date(2012, 11, 5))
      expect(component).to.have.value('2012-12-05T00:00:00.000Z')
    })
  })

  describe('attribute min', () => {
    it('should be valid if filled a valid date', () => {
      date.setAttribute('min', '2010-10-05')
      date.setAttribute('required')
      date.writeText('2010-10-06')
      component.validate()
      expect(component).to.not.have.class('invalid')
      expect(component).to.not.have.class('min')
    })

    it('should be invalid if filled an invalid value', () => {
      date.setAttribute('min', '2010-10-05')
      date.setAttribute('required')
      date.writeText('2010-10-04')
      component.validate()
      expect(component).to.have.class('invalid')
      expect(component).to.have.class('min')
    })
  })

  describe('attribute max', () => {
    it('should be valid if filled a valid date', () => {
      date.setAttribute('max', '2017-05-06')
      date.setAttribute('required')
      date.writeText('2017-05-05')
      component.validate()
      expect(component).to.not.have.class('invalid')
      expect(component).to.not.have.class('max')
    })

    it('should be invalid if filled with invalid value', () => {
      date.setAttribute('max', '2017-05-06')
      date.setAttribute('required')
      date.writeText('2017-05-07')
      component.validate()
      expect(component).to.have.class('invalid')
      expect(component).to.have.class('max')
    })
  })
})

function loadComponent() {
  // require('minimalist').date
}

function cleanView() {
  const form = document.querySelector('form')

  if (form) {
    form.parentNode.removeChild(form)
  }
}

function createComponent() {
  const form = document.createElement('form')
  form.setAttribute('name', 'formName')
  form.setAttribute('id', 'formID')

  component = document.createElement('mn-date')

  form.appendChild(component)
  document.body.appendChild(form)
}

function setPageObject() {
  const DatePageObject = require('./date.po.js')
  date = new DatePageObject(component)
}
