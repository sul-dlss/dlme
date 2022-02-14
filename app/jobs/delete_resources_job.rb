# frozen_string_literal: true

# Load JSON resources from a url, then remove them from the index and delete them
class DeleteResourcesJob < ApplicationJob
  queue_as :default

  def perform(url, exhibit)
    logger.info("Begin delete resources job from #{url}.")

    resp = Faraday.get(url)

    resource_hashes = NdjsonNormalizer.normalize(resp.body, url)
    resource_hashes.each do |resource_hash|
      resource = DlmeJson.find_by(url: resource_hash['id'], exhibit: exhibit)
      next unless resource

      ResourceRemover.remove_resource(resource: resource)
    end

    logger.info("#{resource_hashes.count} records were removed from #{url}.")
  end
end
