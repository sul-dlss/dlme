# frozen_string_literal: true

# Transform METS flavored CSV data into the IR and index it
class MetCsvTransformJob < ApplicationJob
  queue_as :default

  def perform(identifier, met_csv)
    indexer = Traject::Indexer.new('identifier' => identifier)
    indexer.load_config_file(Rails.root + 'config/traject.rb')
    indexer.load_config_file(Rails.root + 'lib/traject/met_csv_config.rb')
    indexer.process(met_csv)
  end
end
