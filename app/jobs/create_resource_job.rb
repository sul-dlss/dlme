# frozen_string_literal: true

# Persist JSON resources and index them
class CreateResourceJob < ApplicationJob
  queue_as :default

  def perform(id, exhibit, json)
    resource = DlmeJson.find_or_initialize_by(url: id, exhibit_id: exhibit.id)
    resource.data = { json: json }
    return if resource.save_and_index
    logger.warn "Unable to save resource #{id} because: #{resource.errors.full_messages}"
  end
end
