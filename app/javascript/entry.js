// This is the entrypoint for the importmap build.
// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import jQuery from 'jquery'
window.jQuery = jQuery
window.$ = jQuery
console.log("Jauery: ", jQuery)

import "@hotwired/turbo-rails"

import "controllers"

import 'bootstrap'
import Blacklight from 'blacklight'
window.Blacklight = Blacklight

import 'imagesloaded.min'
import 'masonry.min'
import('blacklight_gallery/slideshow')
import('blacklight_gallery/masonry')