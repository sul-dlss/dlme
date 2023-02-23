# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "jquery", to: "https://ga.jspm.io/npm:jquery@3.6.3/dist/jquery.js", preload: true
pin "bootstrap", to: "https://ga.jspm.io/npm:bootstrap@4.6.2/dist/js/bootstrap.js"
pin "popper.js", to: "https://ga.jspm.io/npm:popper.js@1.16.1/dist/umd/popper.js"
pin "@hotwired/turbo-rails", to: "https://ga.jspm.io/npm:@hotwired/turbo-rails@7.2.5/app/javascript/turbo/index.js"
pin "@hotwired/turbo", to: "https://ga.jspm.io/npm:@hotwired/turbo@7.2.5/dist/turbo.es2017-esm.js"
pin "@rails/actioncable/src", to: "https://ga.jspm.io/npm:@rails/actioncable@7.0.4/src/index.js"
pin "leaflet", to: "https://ga.jspm.io/npm:leaflet@1.9.3/dist/leaflet-src.js"
pin_all_from Blacklight::Engine.root.join('app/assets/javascripts/blacklight/'), under: 'blacklight'
pin_all_from Spotlight::Engine.root.join('app/assets/javascripts/spotlight/'), under: 'spotlight'
pin "sir-trevor", to: "https://ga.jspm.io/npm:sir-trevor@0.8.2/build/sir-trevor.js"
pin "clipboard", to: "https://ga.jspm.io/npm:clipboard@1.7.1/lib/clipboard.js"
pin "delegate", to: "https://ga.jspm.io/npm:delegate@3.2.0/src/delegate.js"
pin "good-listener", to: "https://ga.jspm.io/npm:good-listener@1.2.2/src/listen.js"
pin "select", to: "https://ga.jspm.io/npm:select@1.1.2/src/select.js"
pin "tiny-emitter", to: "https://ga.jspm.io/npm:tiny-emitter@2.1.0/index.js"
pin "i18n-js", to: "https://ga.jspm.io/npm:i18n-js@3.9.2/app/assets/javascripts/i18n.js"
