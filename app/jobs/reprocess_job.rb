# frozen_string_literal: true

# Process all the files from a Harvest
class ReprocessJob < ApplicationJob
  # @param harvest [Harvest] the harvest instance of the resources
  def perform(harvest)
    harvest.harvested_resources.each do |resource|
      process_resource(resource)
    end
  end

  private

  def process_resource(resource)
    resource.pipeline.job.perform_later(resource)
  end
end
