# frozen_string_literal: true

class ApplicationController < ActionController::Base
  helper Openseadragon::OpenseadragonHelper
  # Adds a few additional behaviors into the application controller
  include Blacklight::Controller
  include Spotlight::Controller

  layout 'blacklight'

  protect_from_forgery with: :exception
  before_action do
    Rack::MiniProfiler.authorize_request
  end
end
