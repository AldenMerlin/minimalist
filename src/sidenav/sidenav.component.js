import Minimalist, {component, listen, keydown} from '../minimalist/minimalist.class.js'
import Backdrop from '../backdrop/backdrop.class.js'

@component('mn-sidenav')
/*
  styles: [
    'section',
    'backdrop',
    'sidenav',
  ]
*/
class Sidenav extends Minimalist {
  beforeRender() {
    this.classList.add('mn-sidenav')
    this.classList.add('mn-section')
    Backdrop.create()
  }

  render() {
    return this.innerHTML
  }

  @listen('click', '[show-sidenav]', false)
  show(event) {
    let id

    if (event) {
      event.stopPropagation()
      id = event.target.getAttribute('show-sidenav')
    }

    if (!event || this.id === id && window[id]) {
      this.classList.add('visible')
      this.scrollTop = 0
      document.body.classList.add('mn-sidenav-visible')
      Backdrop.show()
      this.dispatchEvent(new Event('show'))
    }
  }

  @keydown('Escape')
  @listen('click', 'body', false)
  @listen('click', '[hide-sidenav]', false)
  hide() {
    document.body.classList.remove('mn-sidenav-visible')
    this.classList.remove('visible')
    Backdrop.hide()
    this.dispatchEvent(new Event('hide'))
  }

  @listen('click', '[toggle-sidenav]', false)
  toggle() {
    this.classList.toggle('visible')
      ? this.show()
      : this.hide()
  }
}

export default Sidenav
