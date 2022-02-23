# frozen_string_literal: true

# Load JSON resources from a local or remote location and index them
class AddResourcesJob < ApplicationJob
  queue_as :default

  def perform(location, exhibit:, local: false)
    logger.info("Begin loading records from #{location}.")

    resources = get_resources(location, local)
    resources.each_with_index do |item, index|
      create_or_update_resource(item, exhibit, index, location)
    end

    exhibit.touch # rubocop:disable Rails/SkipsModelValidations

    logger.info("#{resources.count} records were created from #{location}.")
  end

  private

  def get_resources(location, local)
    resources = local ? File.read(location) : Faraday.get(location).body
    NdjsonNormalizer.normalize(resources, location)
  end

  def create_or_update_resource(item, exhibit, index, location)
    resource = DlmeJson.find_or_initialize_by(url: item['id'], exhibit: exhibit)
    resource.data = { json: item.to_json }

    raise "Resource #{index + 1} in #{location} is not valid: #{resource.errors.full_messages.to_sentence}" unless resource.valid?

    resource.save
    resource.reindex(touch: false)
  end
end
