/* global describe, it, before, beforeEach */
const {expect} = require('chai')
  .use(require('chai-dom'))
  .use(require('chai-style'))

// let form
let component

describe('mn-form (webcomponent)', () => {
  before(loadComponent)
  beforeEach(cleanView)
  beforeEach(createComponent)
  // beforeEach(setPageObject)

  describe('instance', () => {
    it('should work with a constructor', () => {
      const MnForm = window.customElements.get('mn-form')
      component = new MnForm()
      expect(component).to.be.instanceof(MnForm)
    })

    it('should work with document.createElement()', () => {
      const MnForm = window.customElements.get('mn-form')
      component = document.createElement('mn-form')
      expect(component).to.be.instanceof(MnForm)
    })
  })

  describe('component', () => {
    it('should have the .mn-form class', () => {
      expect(component).to.have.class('mn-form')
    })
  })

  describe('method validate', () => {
    it('should have the method', () => {
      expect(component).to.have.property('validate')
      expect(component.validate).to.be.a('function')
    })
  })

  describe('property data', () => {
    it('should be an object', () => {
      expect(component).to.have.property('data')
      expect(component.data).to.be.an('object')
    })

    it('should have keys from input names', () => {
      expect(component.data).to.have.all.keys('username', 'password')
    })

    it('should apply values to keys', () => {
      component.username.value = 'john'
      component.password.value = 'snow'
      expect(component.data).to.have.property('username', 'john')
      expect(component.data).to.have.property('password', 'snow')
    })
  })
})

function loadComponent() {
  // require('minimalist').form
}

function cleanView() {
  const form = document.querySelector('mn-form')

  if (form) {
    form.parentNode.removeChild(form)
  }
}

function createComponent() {
  component = document.createElement('mn-form')
  document.body.appendChild(component)

  const username = document.createElement('mn-input')
  component.appendChild(username)
  username.setAttribute('name', 'username')

  const password = document.createElement('mn-password')
  component.appendChild(password)
  password.setAttribute('name', 'password')
}

// function setPageObject() {
//   const FormPageObject = require('./action-sheet.po.js')
//   form = new FormPageObject(component)
// }
