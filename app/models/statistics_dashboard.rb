# frozen_string_literal: true

##
# A class to model the statistics on the exhibit statistics dashboard.
# This Dashboard class requires that a Blacklight SearchServices is injected into it
class StatisticsDashboard
  attr_reader :search_service
  def initialize(search_service:)
    @search_service = search_service
  end

  def items
    @items ||= Items.new(search_service)
  end

  # Represents data in the Itms section of the dashboard
  class Items
    LOCALE_MAP = { 'ar' => 'ar-Arab' }.with_indifferent_access

    attr_reader :search_service
    def initialize(search_service)
      @search_service = search_service
    end

    def total
      response.dig('response', 'numFound')
    end

    def to_partial_path
      'statistics/items'
    end

    def language_field
      "cho_language.#{mapped_locale}_ssim"
    end

    def by_language
      (facet_fields[language_field] || []).each_slice(2).collect do |(value, count)|
        { 'value' => value, 'count' => count }
      end
    end

    def type_field
      "cho_edm_type.#{mapped_locale}_ssim"
    end

    def sub_type_field
      "cho_has_type.#{mapped_locale}_ssim"
    end

    def by_type
      pivot_facets["#{type_field},#{sub_type_field}"] || []
    end

    private

    def mapped_locale
      LOCALE_MAP[I18n.locale] || I18n.locale
    end

    def facet_fields
      facets['facet_fields'] || {}
    end

    def pivot_facets
      facets['facet_pivot'] || {}
    end

    def facets
      response.dig('facet_counts') || {}
    end

    def response
      @response ||= search_service.search_results&.first || {}
    end
  end
end
