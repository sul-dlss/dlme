# frozen_string_literal: true

# Use custom HTML classes for a 4/8 column split
class OwnerLayoutComponent < Blacklight::MetadataFieldLayoutComponent
  def initialize(field:, label_class: 'col-md-4', value_class: 'col-md-8')
    super
  end
end
