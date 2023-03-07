// This is the entrypoint for the importmap build.
// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import jQuery from 'jquery'
window.jQuery = jQuery
window.$ = jQuery

import "@hotwired/turbo-rails"

import "controllers"

import 'bootstrap'
import Blacklight from 'blacklight'
window.Blacklight = Blacklight

import 'modules/transform_result'
import 'modules/line-collapse'
import Spotlight from 'spotlight'
window.Spotlight = Spotlight