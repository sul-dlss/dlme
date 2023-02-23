# frozen_string_literal: true

# Displays the metadata for an item.
class DocumentMetadataComponent < ViewComponent::Base
  FIELDS = %w[holding_institution source_institution].freeze
  def initialize(fields:)
    super
    (@local_fields, @fields) = fields.partition { |field| FIELDS.include?(field.key) }
  end
end
