# frozen_string_literal: true

module Api
  # A base for APIs that use simple token authentication
  class ApiController < ActionController::API
    include ActionController::HttpAuthentication::Token::ControllerMethods

    before_action :authenticate
    respond_to :json

    private

    def authenticate
      authenticate_or_request_with_http_token do |token, _options|
        ActiveSupport::SecurityUtils.secure_compare(token, ENV.fetch('API_TOKEN', ''))
      end
    end
  end
end
