# frozen_string_literal: true

# Transform METS flavored CSV data into the IR and index it
class MetCsvTransformJob < ApplicationJob
  queue_as :default

  def perform(resource)
    indexer = Traject::Indexer.new
    indexer.load_config_file(Rails.root + 'config/traject.rb')
    indexer.load_config_file(Rails.root + 'lib/traject/met_csv_config.rb')
    indexer.process(resource.content)
  end
end
