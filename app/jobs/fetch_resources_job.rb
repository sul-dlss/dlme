# frozen_string_literal: true

# Load JSON resources from a url, persist them, and index them
class FetchResourcesJob < ApplicationJob
  queue_as :default

  def perform(url, exhibit)
    resp = Faraday.get(url)

    resources = NdjsonNormalizer.normalize(resp.body, url)
    resources.each_with_index do |item, index|
      create_or_update_resource(item, exhibit, index, url)
    end

    logger.info("#{resources.count} records were created from #{url}.")
  end

  private

  def create_or_update_resource(item, exhibit, index, url)
    resource = DlmeJson.find_or_initialize_by(url: item['id'], exhibit: exhibit)
    resource.data = { json: item.to_json }

    raise "Resource #{index + 1} in #{url} is not valid: #{resource.errors.full_messages.to_sentence}" unless resource.valid?

    resource.save
    resource.reindex
  end
end
