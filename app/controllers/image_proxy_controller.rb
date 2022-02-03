# frozen_string_literal: true

##
# Controller for proxying HTTP images
class ImageProxyController < ApplicationController
  before_action :validate_referer

  CacheableResponse = Struct.new(:body, :type)

  def access
    send_data proxied_response.body, type: proxied_response.type, disposition: 'inline'
  end

  private

  ##
  # To prevent outside applications from using this proxy
  def validate_referer
    render plain: 'invalid referrer', status: :forbidden unless request.referer.to_s.starts_with?(root_url)
  end

  def proxied_response
    @proxied_response ||= Rails.cache.fetch([image_url], expires_in: Settings.cache_period) do
      benchmark "Fetch #{image_url}" do
        response = HTTP.follow.get(image_url)
        CacheableResponse.new(response.body.to_s, response.content_type.to_s)
      end
    end
  end

  def image_url
    params.require(:url)
  end
end
