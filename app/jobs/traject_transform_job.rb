# frozen_string_literal: true

# Transform resources into the IR and index it
class TrajectTransformJob < ApplicationJob
  queue_as :default

  def perform(resource, pipeline)
    pipeline.indexer(resource).process(resource.content)
  end
end
