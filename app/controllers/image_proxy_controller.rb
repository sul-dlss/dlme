# frozen_string_literal: true

##
# Controller for proxying HTTP images
#
# Only URLs that are the thumbnail of an indexed document are proxied. Additionally, only
# http(s) URLs that resolve to public IP addresses are fetched (checked on every redirect,
# with the connection pinned to the vetted address to prevent DNS rebinding).
# Responses must be images no larger than Settings.image_proxy.max_size.
class ImageProxyController < ApplicationController
  before_action :validate_referer

  CacheableResponse = Struct.new(:body, :type)

  class InvalidResponse < StandardError; end
  class NotIndexed < StandardError; end

  def access
    send_data proxied_response.body, type: proxied_response.type, disposition: 'inline'
  rescue NotIndexed
    reject :not_found, 'not an indexed thumbnail'
  rescue SsrfFilter::Error, InvalidResponse, URI::InvalidURIError => e
    reject :bad_request, e.message
  rescue *SsrfFilter::CONNECTION_ERRORS, Net::ReadTimeout, SocketError, OpenSSL::SSL::SSLError => e
    reject :bad_gateway, e.message
  end

  private

  def reject(status, reason)
    Rails.logger.info("Image proxy did not serve #{image_url}: #{reason}")
    head status
  end

  ##
  # To prevent outside applications from using this proxy
  def validate_referer
    render plain: 'invalid referrer', status: :forbidden unless request.referer.to_s.starts_with?(root_url)
  end

  def proxied_response
    @proxied_response ||= Rails.cache.fetch([image_url], expires_in: Settings.cache_period) do
      benchmark "Fetch #{image_url}" do
        fetch_image
      end
    end
  end

  # The cache is only populated after this check passes, so cache hits need not repeat it
  def fetch_image
    raise NotIndexed unless indexed_thumbnail?

    body = nil
    response = SsrfFilter.get(image_url, max_redirects: 5, http_options: http_options) do |res|
      body = res.is_a?(Net::HTTPSuccess) ? read_limited_body(res) : nil
    end

    raise InvalidResponse, "unexpected status #{response.code}" unless response.is_a?(Net::HTTPSuccess) && body

    CacheableResponse.new(body, response.content_type)
  end

  def indexed_thumbnail?
    # Local params are ignored in q by edismax (our default defType), so use fq
    response = Blacklight.default_index.connection.get(
      'select', params: { q: '*:*', fq: "{!term f=#{thumbnail_field} v=$thumbnail_url}", thumbnail_url: image_url,
                          rows: 0 }
    )
    response.dig('response', 'numFound').to_i.positive?
  end

  def thumbnail_field
    CatalogController.blacklight_config.index.thumbnail_field
  end

  def read_limited_body(res)
    raise InvalidResponse, "non-image content type #{res.content_type}" unless allowed_content_type?(res.content_type)

    max_size = Settings.image_proxy.max_size
    raise InvalidResponse, 'response too large' if res.content_length.to_i > max_size

    buffer = +''
    res.read_body do |chunk|
      buffer << chunk
      raise InvalidResponse, 'response too large' if buffer.bytesize > max_size
    end
    buffer
  end

  # SVG is excluded because it can carry script and would be served from our origin
  def allowed_content_type?(content_type)
    content_type.to_s.start_with?('image/') && content_type != 'image/svg+xml'
  end

  def http_options
    { open_timeout: Settings.image_proxy.open_timeout, read_timeout: Settings.image_proxy.read_timeout }
  end

  def image_url
    params.require(:url)
  end
end
