# frozen_string_literal: true

# Model for a single metadata file that was harvested
class HarvestedResource < ApplicationRecord
  belongs_to :harvest
  belongs_to :pipeline

  def content
    StringIO.new(resource_content.body)
  end

  def resource_content
    @resource_content ||= ResourceContent.find_by!(multihash: multihash)
  end
end
