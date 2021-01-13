# frozen_string_literal: true

##
# Controller for proxying HTTP images
class ImageProxyController < ApplicationController
  before_action :validate_token

  CacheableResponse = Struct.new(:body, :type)

  def access
    send_data proxied_response.body, type: proxied_response.type, disposition: 'inline'
  end

  private

  ##
  # To prevent outside applications from using this proxy
  def validate_token
    render plain: 'invalid token', status: :forbidden unless valid_authenticity_token?(session, image_token)
  end

  def proxied_response
    @proxied_response ||= begin
      Rails.cache.fetch([image_url], expires_in: Settings.cache_period) do
        benchmark "Fetch #{image_url}" do
          response = HTTP.get(image_url)
          CacheableResponse.new(response.body.to_s, response.content_type.to_s)
        end
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
