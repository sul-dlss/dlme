# frozen_string_literal: true

# Process all the files from a Harvest
class ReprocessJob < ApplicationJob
  # @param harvest [Harvest] the harvest instance of the resources
  def perform(harvest)
    harvest.harvested_resources.each do |resource|
      process_resource(resource, resource.pipeline)
    end
  end

  private

  def process_resource(resource, pipeline)
    TrajectTransformJob.perform_later(resource, pipeline)
  end
end
