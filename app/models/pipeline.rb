# frozen_string_literal: true

# Represents the differnt types of a processing pipelines that are available
class Pipeline < ApplicationRecord
  def self.for(name)
    find_or_create_by(name: name)
  end

  def config
    Settings.import.sources[name]
  end

  def indexer(resource)
    Traject::Indexer.new(traject_config(resource)).tap do |indexer|
      indexer.load_config_file((Rails.root + 'config/traject.rb').to_s)
      indexer.load_config_file((Rails.root + "lib/traject/#{config.traject_file}.rb").to_s)
    end
  end

  private

  def traject_config(resource)
    config.properties.to_h.merge('command_line.filename' => resource.original_filename)
  end
end
