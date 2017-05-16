const {describe, it, before, beforeEach} = require('mocha')
const {expect} = require('chai')
  .use(require('chai-dom'))

const angular = require('angular')
require('angular-mocks')

let element
let scope

describe('mn-input (directive)', () => {
  before(polyfills)
  before(loadComponent)
  beforeEach(angular.mock.module('minimalist'))

  beforeEach(angular.mock.inject(($rootScope, $compile) => {
    scope = $rootScope.$new()
    scope.value = 'Darlan'
    element = document.createElement('mn-input')
    element.setAttribute('ng-model', 'username')
    element.setAttribute('value', '{{ value }}')
    $compile(element)(scope)
    document.body.appendChild(element)
    scope.$digest()
  }))

  describe('element', () => {
    it('should have a ngModel attribute', () => {
      expect(element).to.have.attribute('ng-model')
    })

    it('should have the .mn-input class', () => {
      expect(element).to.have.class('mn-input')
    })

    it('should contain a input child', () => {
      expect(element).to.contain('input').with.length(1)
    })
  })

  describe('attribute value', () => {
    it('should get value', () => {
      expect(element).to.have.value('Darlan')
    })

    it('should set property value when scope change', () => {
      scope.value = 'Clara'
      scope.$digest()
      expect(element).to.have.value('Clara')
    })
  })
})

function polyfills() {
  const supportsCustomElements = 'customElements' in window

  if (!supportsCustomElements) {
    require('@webcomponents/custom-elements')
  }
}

function loadComponent() {
  require('./input.directive.js')
}
