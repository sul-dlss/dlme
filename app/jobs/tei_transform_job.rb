# frozen_string_literal: true

# Transform TEI flavored XML into the IR and index it
class TeiTransformJob < ApplicationJob
  queue_as :default

  def perform(resource)
    indexer = Traject::Indexer.new('identifier' => resource.identifier)
    indexer.load_config_file(Rails.root + 'config/traject.rb')
    indexer.load_config_file(Rails.root + 'lib/traject/tei_config.rb')
    indexer.process(resource.content)
  end
end
