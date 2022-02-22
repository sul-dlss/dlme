# frozen_string_literal: true

##
# A class to model the statistics on the exhibit statistics dashboard.
# This Dashboard class requires that a Blacklight SearchServices is injected into it
class StatisticsDashboard
  LOCALE_MAP = { 'ar' => 'ar-Arab' }.with_indifferent_access
  SOLR_PARAMS = {
    rows: 0,
    facet: true,
    'facet.limit': -1,
    'facet.field': [
      'agg_provider_country.ar-Arab_ssim',
      'agg_provider_country.en_ssim',
      'agg_provider_data_country.ar-Arab_ssim',
      'agg_provider_data_country.en_ssim',
      'agg_data_provider_collection_ssim',
      'cho_type_facet.en_ssim',
      'cho_type_facet.ar-Arab_ssim',
      'cho_language.en_ssim',
      'cho_language.ar-Arab_ssim'
    ],
    'f.agg_provider_country.ar-Arab_ssim.facet.limit' => -1,
    'f.agg_provider_country.en_ssim.facet.limit' => -1,
    'f.agg_data_provider_country.ar-Arab_ssim.facet.limit' => -1,
    'f.agg_data_provider_country.en_ssim.facet.limit' => -1,
    'f.agg_data_provider_collection_ssim.facet.limit' => -1,
    'f.cho_language.en_ssim.facet.limit' => -1,
    'f.cho_language.ar-Arab_ssim.facet.limit' => -1,
    'facet.pivot': [
      %w[agg_provider.en_ssim agg_provider_country.en_ssim agg_data_provider_collection_ssim].join(','),
      %w[agg_provider.ar-Arab_ssim agg_provider_country.ar-Arab_ssim agg_data_provider_collection_ssim].join(','),
      %w[agg_data_provider.en_ssim agg_data_provider_country.en_ssim agg_data_provider_collection_ssim].join(','),
      %w[agg_data_provider.ar-Arab_ssim agg_data_provider_country.ar-Arab_ssim agg_data_provider_collection_ssim].join(',')
    ]
  }.freeze

  attr_reader :search_service

  def initialize(search_service:)
    @search_service = search_service
  end

  def items
    @items ||= Items.new(response)
  end

  def holding_institutions
    @holding_institutions ||= Contributors.new(response, provider_field: 'agg_data_provider')
  end

  def data_providers
    @data_providers ||= Contributors.new(response, provider_field: 'agg_provider')
  end

  def collections
    @collections ||= Collections.new(response)
  end

  class << self
    def locale_aware_field(field_name, suffix = 'ssim')
      "#{field_name}.#{mapped_locale}_#{suffix}"
    end

    private

    def mapped_locale
      StatisticsDashboard::LOCALE_MAP[I18n.locale] || I18n.locale
    end
  end

  private

  def response
    @response ||= search_service.repository.search(search_builder)
  end

  def search_builder
    search_service.search_builder.merge(SOLR_PARAMS)
  end

  # Represents data in the Itms section of the dashboard
  class Items
    attr_reader :response

    def initialize(response)
      @response = response
    end

    def total
      response.dig('response', 'numFound')
    end

    def to_partial_path
      'statistics/items'
    end

    def language_field
      StatisticsDashboard.locale_aware_field('cho_language')
    end

    def language_facet_field
      "language_#{I18n.locale}"
    end

    def by_language
      (facet_fields[language_field] || []).each_slice(2).collect do |(value, count)|
        { 'value' => value, 'count' => count }
      end
    end

    def type_facet
      StatisticsDashboard.locale_aware_field('cho_type_facet')
    end

    def by_type
      (facet_fields[type_facet] || []).each_slice(2).collect do |(value, count)|
        { 'value' => value,
          'display_value' => value.split(':').last,
          'count' => count,
          'level' => value.count(':') }
      end
    end

    private

    def facet_fields
      facets['facet_fields'] || {}
    end

    def facets
      response.dig('facet_counts') || {}
    end
  end

  # Represents data in the Collections section of the dashboard
  class Collections
    attr_reader :response

    def initialize(response)
      @response = response
    end

    def total
      collections&.count || 0
    end

    def collections
      @collections ||= (facet_fields[collections_field] || []).each_slice(2).collect do |(value, count)|
        { 'value' => value, 'count' => count }
      end
    end

    private

    def collections_field
      'agg_data_provider_collection_ssim'
    end

    def facet_fields
      facets['facet_fields'] || {}
    end

    def facets
      response.dig('facet_counts') || {}
    end
  end

  # Represents data in the Contributors section of the dashboard
  class Contributors
    attr_reader :response, :provider_field_key

    def initialize(response, provider_field: nil)
      @response = response
      @provider_field_key = provider_field
    end

    def total
      institutions&.count || 0
    end

    def total_countries
      institutions.collect(&:countries).flatten.uniq.count
    end

    def institutions
      pivot_field = "#{provider_field},#{countries_field},#{collections_field}"
      @institutions ||= (pivot_facets[pivot_field] || []).collect do |facet|
        Institution.new(facet)
      end
    end

    def to_partial_path
      'statistics/contributors'
    end

    def provider_field
      StatisticsDashboard.locale_aware_field(provider_field_key)
    end

    def provider_facet_field
      "#{provider_field_key}_#{I18n.locale}"
    end

    # Represents each row in the Contributors table
    class Institution
      attr_reader :facet

      def initialize(facet)
        @facet = facet
      end

      def name
        facet['value']
      end

      def countries
        facet&.[]('pivot')&.map { |country| country['value'] }
      end

      def collection_count
        country_facet&.[]('pivot')&.length
      end

      def item_count
        facet['count']
      end

      private

      def country_facet
        facet['pivot']&.first
      end
    end

    private

    def countries_field
      StatisticsDashboard.locale_aware_field("#{provider_field_key}_country")
    end

    def collections_field
      'agg_data_provider_collection_ssim'
    end

    def pivot_facets
      facets['facet_pivot'] || {}
    end

    def facets
      response.dig('facet_counts') || {}
    end
  end
end
