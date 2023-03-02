import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    src: String,
    row: String,
  }

  toggleRows() {
    this.element.classList.toggle('collapsed')

    if (this.element.getAttribute('aria-expanded') === 'true')
      this.hideRows()
    else
     this.loadRows()
  }

  hideRows() {
    const blankRow = document.createElement("tr");
    blankRow.setAttribute('id', this.rowValue);
    const parentRow = this.element.closest('tr')

    while(true) {
      const sibling = parentRow.nextElementSibling
      if (sibling.classList.contains('collection-row'))
        sibling.remove()
      else
        break
    }

    parentRow.insertAdjacentElement('afterend', blankRow)
    this.element.setAttribute('aria-expanded', 'false')
  }

  loadRows() {
    this.element.setAttribute('aria-expanded', 'true')

    fetch(this.srcValue, {
      headers: {
        Accept: "text/vnd.turbo-stream.html",
      },
    }).then(r => r.text())
      .then(html => Turbo.renderStreamMessage(html) )
  }
}
