# frozen_string_literal: true

# Grab a thumbnail URL from the Met web service
module MetThumbnailFetcher
  def self.fetch(ident)
    image_json = make_request(ident)

    return if image_json.blank?
    unless image_json['results']
      # Some records have null results
      Rails.logger.warn "No results found in #{ident}\n#{image_json}"
      return
    end
    # Some records e.g. 321624, return empty results
    result = image_json['results'].first
    result['webImageUrl'] if result
  end

  def self.make_request(id)
    DLME::Utils.fetch_json("http://www.metmuseum.org/api/Collection/additionalImages?crdId=#{id}")
  end
  private_class_method :make_request
end
