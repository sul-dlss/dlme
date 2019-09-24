class TransformStatus extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = '<slot></slot>'
  }

  connectedCallback() {
    this.fetchData(this.getAttribute("url"))
  }

  fetchData(url) {
    var request = new XMLHttpRequest()
    request.open("GET", url, true)
    request.responseType = 'json'
    request.onload = (e) => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          this.displayResults(request.response)
        } else {
          console.error(`Request error (${url}): ${request.statusText}`)
        }
      }
    };
    request.onerror = function (e) {
      console.error(request.statusText)
    };
    request.send()
  }

  displayResults(data) {
    var templateId = this.getAttribute("table")
    this.shadowRoot.innerHTML = ''
    var template = document.getElementById(templateId).content.cloneNode(true)
    template.querySelector('tbody').innerHTML = this.rows(data.data)
    this.setPrevious(data.links.prev, template)
    this.setNext(data.links.next, template)
    this.shadowRoot.appendChild(template)
  }

  setPrevious(url, template) {
    const button = template.getElementById('prev')
    if (!url) {
      button.disabled = true
      return
    }
    button.addEventListener('click', () => {
      this.fetchData(url)
    })
  }

  setNext(url, template) {
    const button = template.getElementById('next')

    if (!url) {
      button.disabled = true
      return
    }
    button.addEventListener('click', () => {
      this.fetchData(url)
    })
  }

  rows(rows) {
    const htmlNodes = rows.map((item) => {
      return `<tr>
                <th scope="row"><a href="${item['url']}">${item['url']}</a></th>
                <td>${item['data_path']}</td>
                <td>${item['success'] ? 'Success' : 'Failed'}</td>
                <td>${item['records']}</td>
                <td>${this.formattedDate(item['timestamp'])}</td>
                <td>${item['duration']}</td>
                <td>${item['error'] ? item['error'] : ''}</td>
              </tr>` })
    return htmlNodes.join("\n")
  }

  formattedDate(timestamp) {
    let dt = new Date(Date.parse(timestamp))
    return `${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}`
  }
}
window.customElements.define('transform-status', TransformStatus);
