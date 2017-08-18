# frozen_string_literal: true

# Model for a single metadata file that was harvested
class HarvestedResource < ApplicationRecord
  belongs_to :harvest
  belongs_to :pipeline

  def content
    resource_content.body
  end

  # Return an identifier for use in the IR.  This is a hack that is needed
  # because some of our metadata files don't have identifiers encodeded internally.
  # Don't use this method if you have a better way of getting an identifier.
  def identifier
    prefix = if original_filename.starts_with? Settings.import.directory.penn
               'penn_'
             elsif original_filename.starts_with? Settings.import.directory.stanford
               'stanford_'
             end

    "#{prefix}#{File.basename(original_filename, '.*')}"
  end

  def resource_content
    @resource_content ||= ResourceContent.find_by!(multihash: multihash)
  end
end
