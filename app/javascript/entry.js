// This is the entrypoint for the importmap build.
// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails

import "@hotwired/turbo-rails"

import "controllers"

import 'bootstrap'
import Blacklight from 'blacklight'
import 'openseadragon-rails/rails'
import 'blacklight-gallery'

window.Blacklight = Blacklight

import { I18n } from 'i18n-js'
export const i18n = new I18n()
window.i18n = i18n

import 'transform_result'
import 'blacklight-hierarchy'
import 'openseadragon-rails'

import oembed from 'blacklight-oembed/oembed'
Blacklight.onLoad(function() {
  oembed(document.querySelectorAll('[data-embed-url]'));
});
