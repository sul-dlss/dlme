// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"

import "./controllers"
import "./controllers/external"
import "./analytics"
import "./record_recaptcha"

import * as bootstrap from "bootstrap"
import Blacklight from "blacklight-frontend"
import Spotlight from "spotlight-frontend/app/assets/javascripts/spotlight/spotlight.esm.js"
import "openseadragon-rails"
import "./transform_result"
import oembed from "blacklight-oembed/app/assets/javascripts/blacklight_oembed/oembed.esm"
import "blacklight-gallery/blacklight-gallery.esm.js"
window.Blacklight = Blacklight
import configureRangeLimit from "./range_limit_config"

import BlacklightRangeLimit from "blacklight-range-limit"
BlacklightRangeLimit.init({ onLoadHandler: Blacklight.onLoad })
configureRangeLimit(BlacklightRangeLimit)

Blacklight.onLoad(function () {
  Spotlight.activate()
  oembed(document.querySelectorAll("[data-embed-url]"))
})
