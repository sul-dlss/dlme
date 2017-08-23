# frozen_string_literal: true

# Transform resources into the IR and index it
class TrajectTransformJob < ApplicationJob
  queue_as :default

  def perform(resource, pipeline)
    traject_indexer(resource, pipeline).process(resource.content)
  end

  private

  def traject_indexer(resource, pipeline)
    Traject::Indexer.new(traject_config(resource, pipeline)).tap do |indexer|
      indexer.load_config_file((Rails.root + 'config/traject.rb').to_s)
      indexer.load_config_file((Rails.root + "lib/traject/#{pipeline.config.traject_file}.rb").to_s)
    end
  end

  def traject_config(resource, pipeline)
    pipeline.config.properties.to_h.merge('command_line.filename' => resource.original_filename)
  end
end
