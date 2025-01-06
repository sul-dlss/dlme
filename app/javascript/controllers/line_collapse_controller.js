import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "button", "container" ]
  static values = {
    collapseAt: Number
  }

  connect() {
    this.lineHeight = parseFloat(
      document.defaultView.getComputedStyle(this.containerTarget, null).getPropertyValue('line-height'),
      10
    )
    const containerHeight = parseFloat(this.containerTarget.getBoundingClientRect().height, 10)
    const containerLines = containerHeight / this.lineHeight

    if (containerLines < this.collapseAtValue) {
      return false
    }
    this.containerTarget.classList.add('collapsed')
    this.containerTarget.style.height = `${this.lineHeight * this.collapseAtValue}px`

    this.buttonTarget.hidden = false
  }

  toggle(event) {
    event.preventDefault()

    this.containerTarget.classList.toggle('collapsed')
    this.buttonTarget.classList.toggle('collapsed')

    if (this.containerTarget.style.height && this.containerTarget.style.height != "") {
      this.containerTarget.removeAttribute('style')
    } else {
      this.containerTarget.style.height = `${this.lineHeight * this.collapseAtValue}px`
    }
  }
}
