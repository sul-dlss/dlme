# frozen_string_literal: true

require 'traject'

# Write the traject output to the database as a DlmeJson and index it into solr
class DlmeJsonResourceWriter
  # The passed-in settings
  attr_reader :settings

  def initialize(arg_settings)
    @settings = Traject::Indexer::Settings.new(arg_settings)
    @exhibit = Spotlight::Exhibit.find_by!(slug: @settings.fetch('exhibit_slug'))
  end

  def serialize(_context)
    # nop
  end

  def close
    # nop
  end

  # Add a single context to fedora
  def put(context)
    attributes = context.output_hash.dup
    id = attributes.fetch('id').first

    deep_reduce_single_valued_arrays!(attributes)

    json = JSON.generate(attributes)
    create_resource!(id, json)
  end

  private

  def create_resource!(id, json)
    resource = DlmeJson.find_or_initialize_by(url: id, exhibit_id: @exhibit.id)
    resource.data = { json: json }
    resource.save_and_index
  end

  def deep_reduce_single_valued_arrays!(attributes)
    attributes.transform_values! do |values|
      values.each do |v|
        deep_reduce_single_valued_arrays!(v) if v.respond_to? :transform_values!
      end

      if values.one?
        values.first
      else
        values
      end
    end
  end
end
