# Pin npm packages by running ./bin/importmap

pin "entry", preload: true
pin '@hotwired/turbo-rails', to: 'turbo.min.js', preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"
pin "jquery", to: "https://ga.jspm.io/npm:jquery@3.6.3/dist/jquery.js"
pin "bootstrap", to: "https://ga.jspm.io/npm:bootstrap@4.6.2/dist/js/bootstrap.js"
pin "popper.js", to: "https://ga.jspm.io/npm:popper.js@1.16.1/dist/umd/popper.js"
pin "i18n-js", to: "https://ga.jspm.io/npm:i18n-js@4.2.3/dist/import/index.js"
pin "bignumber.js", to: "https://ga.jspm.io/npm:bignumber.js@9.1.1/bignumber.mjs"
pin "lodash/camelCase", to: "https://ga.jspm.io/npm:lodash@4.17.21/camelCase.js"
pin "lodash/flattenDeep", to: "https://ga.jspm.io/npm:lodash@4.17.21/flattenDeep.js"
pin "lodash/get", to: "https://ga.jspm.io/npm:lodash@4.17.21/get.js"
pin "lodash/has", to: "https://ga.jspm.io/npm:lodash@4.17.21/has.js"
pin "lodash/isArray", to: "https://ga.jspm.io/npm:lodash@4.17.21/isArray.js"
pin "lodash/isObject", to: "https://ga.jspm.io/npm:lodash@4.17.21/isObject.js"
pin "lodash/range", to: "https://ga.jspm.io/npm:lodash@4.17.21/range.js"
pin "lodash/repeat", to: "https://ga.jspm.io/npm:lodash@4.17.21/repeat.js"
pin "lodash/set", to: "https://ga.jspm.io/npm:lodash@4.17.21/set.js"
pin "lodash/sortBy", to: "https://ga.jspm.io/npm:lodash@4.17.21/sortBy.js"
pin "lodash/uniq", to: "https://ga.jspm.io/npm:lodash@4.17.21/uniq.js"
pin "lodash/zipObject", to: "https://ga.jspm.io/npm:lodash@4.17.21/zipObject.js"
pin "make-plural", to: "https://ga.jspm.io/npm:make-plural@7.0.0/plurals.mjs"
pin 'transform_result'
pin "openseadragon" # @5.0.1
