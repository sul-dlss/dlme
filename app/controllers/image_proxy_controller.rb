# frozen_string_literal: true

##
# Controller for proxying HTTP images
class ImageProxyController < ApplicationController
  before_action :validate_token

  def access
    send_data proxied_response.body, type: proxied_response.content_type, disposition: 'inline'
  end

  private

  ##
  # To prevent outside applications from using this proxy
  def validate_token
    render plain: 'invalid token', status: :forbidden unless valid_authenticity_token?(session, image_token)
  end

  def proxied_response
    @proxied_response ||= begin
      benchmark "Fetch #{image_url}" do
        HTTP.get(image_url)
      end
    end
  end

  def image_url
    params.require(:url)
  end

  def image_token
    params.require(:token)
  end
end
