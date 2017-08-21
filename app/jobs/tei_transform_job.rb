# frozen_string_literal: true

# Transform TEI flavored XML into the IR and index it
class TeiTransformJob < ApplicationJob
  queue_as :default

  def perform(identifier, tei)
    indexer = Traject::Indexer.new('identifier' => identifier)
    indexer.load_config_file(Rails.root + 'config/traject.rb')
    indexer.load_config_file(Rails.root + 'lib/traject/tei_config.rb')
    indexer.process(tei)
  end
end
