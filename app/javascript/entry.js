// This is the entrypoint for the importmap build.
// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import jQuery from 'jquery'
window.jQuery = jQuery
window.$ = jQuery

import "@hotwired/turbo-rails"

import "controllers"

import 'bootstrap'
import Blacklight from 'blacklight'
import 'openseadragon-rails/rails'

window.Blacklight = Blacklight

import { I18n } from 'i18n-js'
export const i18n = new I18n()

import 'transform_result'
import 'blacklight-hierarchy'
