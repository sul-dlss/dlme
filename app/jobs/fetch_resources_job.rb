# frozen_string_literal: true

# Load JSON resources from a url, persist them, and index them
class FetchResourcesJob < AddResourcesJob
  private

  def get_resources(location)
    resp = Faraday.get(location)
    NdjsonNormalizer.normalize(resp.body, location)
  end
end
