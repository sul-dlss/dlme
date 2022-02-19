# frozen_string_literal: true

# Load JSON resources from an arbitrary location and index them
class AddResourcesJob < ApplicationJob
  queue_as :default

  def perform(location, exhibit)
    logger.info("Begin loading records from #{location}.")

    resources = get_resources(location)
    resources.each_with_index do |item, index|
      create_or_update_resource(item, exhibit, index, location)
    end

    exhibit.touch # rubocop:disable Rails/SkipsModelValidations

    logger.info("#{resources.count} records were created from #{location}.")
  end

  private

  def get_resources(location)
    raise NotImplementedError
  end

  def create_or_update_resource(item, exhibit, index, location)
    resource = DlmeJson.find_or_initialize_by(url: item['id'], exhibit: exhibit)
    resource.data = { json: item.to_json }

    raise "Resource #{index + 1} in #{location} is not valid: #{resource.errors.full_messages.to_sentence}" unless resource.valid?

    resource.save
    resource.reindex(touch: false)
  end
end
