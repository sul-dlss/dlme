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
import 'modules/range_limit_config'
import Spotlight from 'spotlight'
window.Spotlight = Spotlight

document.addEventListener('turbo:load', function(event) {
  if (typeof(gtag) == 'undefined') return;
  
  // Google docs on manually creating pageviews in GA4:
  // https://developers.google.com/analytics/devguides/collection/ga4/views?client_type=gtag#manually_send_page_view_events
  gtag('event', 'page_view', {
    page_location: event.detail.url
  });
});
