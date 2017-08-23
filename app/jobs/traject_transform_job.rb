# frozen_string_literal: true

# Transform resources into the IR and index it
class TrajectTransformJob < ApplicationJob
  queue_as :default

  def perform(resource, config)
    indexer = Traject::Indexer.new(config.properties.to_h.merge('command_line.filename' => resource.original_filename))
    indexer.load_config_file(Rails.root + 'config/traject.rb')
    indexer.load_config_file(Rails.root + "lib/traject/#{config.traject_file}.rb")
    indexer.process(resource.content)
  end
end
