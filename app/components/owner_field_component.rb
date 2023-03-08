# frozen_string_literal: true

# Set our custom layout for the owner field
class OwnerFieldComponent < Blacklight::MetadataFieldComponent
  def initialize(**args)
    super(layout: OwnerLayoutComponent, **args)
  end
end
