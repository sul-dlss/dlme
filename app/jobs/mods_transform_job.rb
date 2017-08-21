# frozen_string_literal: true

# Transform MODS flavored XML into the IR and index it
class ModsTransformJob < ApplicationJob
  queue_as :default

  def perform(identifier, mods)
    indexer = Traject::Indexer.new('identifier' => identifier)
    indexer.load_config_file(Rails.root + 'config/traject.rb')
    indexer.load_config_file(Rails.root + 'lib/traject/mods_config.rb')
    indexer.process(mods)
  end
end
