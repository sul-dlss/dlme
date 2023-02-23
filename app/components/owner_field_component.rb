# frozen_string_literal: true

# Set our custom layout for the owner field
class OwnerFieldComponent < Blacklight::MetadataFieldComponent
  def initialize(layout: OwnerLayoutComponent, **)
    super
  end
end
