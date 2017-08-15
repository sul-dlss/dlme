# frozen_string_literal: true

# Transform MODS flavored XML into the IR and index it
class ModsTransformJob < ApplicationJob
  queue_as :default

  def perform(identifier, mods)
    indexer = Traject::Indexer.new('identifier' => identifier, 'exhibit_slug' => Settings.import.slug)
    indexer.load_config_file('lib/traject/mods_config.rb')
    indexer.process(mods)
  end
end
