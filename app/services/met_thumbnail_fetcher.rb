# frozen_string_literal: true

# Grab a thumbnail URL from the Met web service
module MetThumbnailFetcher
  def self.fetch(ident)
    image_json = make_request(ident)

    return if image_json.blank?
    raise "No results found in #{ident}\n#{image_json}" unless image_json.key?('results')
    # Some records e.g. 321624, don't return any results
    result = image_json['results'].first
    result['webImageUrl'] if result
  end

  def self.make_request(id)
    uri = URI("http://www.metmuseum.org/api/Collection/additionalImages?crdId=#{id}")
    resp = Faraday.get uri
    ::JSON.parse(resp.body) if resp.success?
  end
  private_class_method :make_request
end
