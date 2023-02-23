// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import jQuery from 'jquery'
window.jQuery = jQuery
window.$ = jQuery

console.log("JQURY imported")
import 'bootstrap'
import "@hotwired/turbo-rails"
import L from 'leaflet'
window.L = L
import SirTrevor from 'sir-trevor'
window.SirTrevor = SirTrevor
import Clipboard from 'clipboard'
window.Clipboard = Clipboard

// We can probably ditch this dynamic import once we use Blacklight 8
import('blacklight/blacklight')
import('spotlight/spotlight.esm').then((Spotlight)=> { 
  console.log('spotlight defined')
  window.Spotlight = Spotlight
})

import {I18n} from 'i18n-js'
window.I18n = I18n

//= require rails-ujs
//= require turbolinks
//
//
// Required by Blacklight
//= require jquery3
//= require popper
//= require twitter/typeahead
//= require bootstrap
//= require bootstrap/util
//= require blacklight/blacklight

//= require transform_result
//= require i18n/translations
// require_tree .


// For blacklight_range_limit built-in JS, if you don't want it you don't need
// this:
//= require 'blacklight_range_limit'