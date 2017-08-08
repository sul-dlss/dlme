# frozen_string_literal: true

require 'traject'

# Write the traject output to the database as a DlmeJson and index it into solr
class DlmeJsonResourceWriter
  # The passed-in settings
  attr_reader :settings

  def initialize(arg_settings)
    @settings = Traject::Indexer::Settings.new(arg_settings)
    @exhibit = Spotlight::Exhibit.find_by(slug: @settings.fetch('exhibit_slug'))
  end

  def serialize(_context)
    # nop
  end

  def close
    # nop
  end

  # Add a single context to fedora
  def put(context)
    json = JSON.generate(context.output_hash)
    create_resource!(json)
  end

  private

  def create_resource!(json)
    resource = DlmeJson.new(data: { json: json },
                            exhibit: @exhibit)
    resource.save_and_index
  end
end
