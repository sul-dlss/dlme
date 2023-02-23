# frozen_string_literal: true

# Override the date range component to support multiple calendar systems
class MultilingualDateRangeComponent < ViewComponent::Base
  def initialize(facet_field:, layout: nil, classes: BlacklightRangeLimit.classes)
    super

    @facet_field = facet_field
    @layout = layout == false ? Blacklight::FacetFieldNoLayoutComponent : Blacklight::FacetFieldComponent
    @classes = classes
  end

  def field_name
    @facet_field.key
  end

  ##
  # Builds out our data attributes used in the custom date range switcher
  # NOTE: In adding tests, we get the ActionController::UrlGenerationError: No route matches
  def date_range_switcher_query_paths
    other_field_name = facet_configuration[:configured_range_fields].find { |f| f[:field] != field_name }[:field]
    {
      other_field_name => helpers.range_limit_panel_url(id: other_field_name, range: nil, locale: :en),
      field_name => helpers.range_limit_panel_url(id: field_name)
    }
  end

  def facet_configuration
    @facet_field.facet_field
  end

  def range_limit_component
    BlacklightRangeLimit::RangeFacetComponent.new(facet_field: @facet_field, layout: false)
  end
end
