# frozen_string_literal: true

##
# Simplified catalog controller
class CatalogController < ApplicationController
  include Blacklight::Catalog
  include BlacklightRangeLimit::ControllerOverride

  configure_blacklight do |config|
    # Disable bookmarks
    config.index.document_actions[:bookmark].if = false
    config.show.document_actions[:bookmark].if = false

    # Remove bookmark/saved searches/history from the navbar
    config.navbar.partials = {}

    config.show.oembed_field = :"agg_is_shown_at.wr_id_ssim"
    config.show.partials = %i[show_header show_with_viewer ir_view]

    config.view.list.partials = %i[thumbnail index_header index]
    config.view.gallery.partials = %i[index_header index]
    config.view.slideshow.partials = [:index]

    config.add_results_collection_tool(:sort_widget)
    config.add_results_collection_tool(:per_page_widget)
    config.add_results_collection_tool(:view_type_group)

    config.show.tile_source_field = :content_metadata_image_iiif_info_ssm
    ## Default parameters to send to solr for all search-like requests. See also SolrHelper#solr_search_params
    config.default_solr_params = {
      qt: 'search',
      rows: 10,
      fl: '*'
    }

    config.document_solr_path = 'get'
    config.document_unique_id_param = 'ids'
    config.raw_endpoint.enabled = true

    config.index.title_field = Blacklight::Configuration::Field.new(first: true, **multilingual_locale_aware_field('cho_title'))
    config.show.html_title_field = Blacklight::Configuration::Field.new(
      first: true,
      no_html: true,
      **multilingual_locale_aware_field('cho_title')
    )

    config.index.thumbnail_field = 'agg_preview.wr_id_ssim'
    config.index.default_thumbnail = 'default.png'

    config.add_index_field 'title', **multilingual_locale_aware_field('cho_title')

    config.add_index_field 'date range', helper_method: :display_date_ranges, values: (lambda do |_field_config, document|
      {
        gregorian: document.fetch('cho_date_range_norm_isim', []),
        hijri: document.fetch('cho_date_range_hijri_isim', [])
      }
    end)

    config.add_index_field 'date', **multilingual_locale_aware_field('cho_date')
    config.add_index_field 'holding institution', **multilingual_locale_aware_field('agg_data_provider')
    config.add_index_field 'source institution', **multilingual_locale_aware_field('agg_provider')

    config.add_index_field 'extent', **multilingual_locale_aware_field('cho_extent')
    config.add_index_field 'creator', **multilingual_locale_aware_field('cho_creator')
    config.add_index_field 'description',
                           **multilingual_locale_aware_field('cho_description'),
                           autolink: true,
                           paragraph: true,
                           join_with: ''
    config.add_index_field 'language', **multilingual_locale_aware_field('cho_language')
    config.add_index_field 'medium', **multilingual_locale_aware_field('cho_medium')
    config.add_index_field 'provenance',
                           **multilingual_locale_aware_field('cho_provenance'),
                           paragraph: true,
                           join_with: ''
    config.add_index_field 'source', **multilingual_locale_aware_field('cho_source')
    config.add_index_field 'spatial', **multilingual_locale_aware_field('cho_spatial')
    config.add_index_field 'temporal', **multilingual_locale_aware_field('cho_temporal')

    arabic_locale = ->(*_) { I18n.locale == :ar }
    en_locale = ->(*_) { I18n.locale == :en }

    config.add_facet_field 'type_pivot_en', pivot: %w[cho_edm_type.en_ssim cho_has_type.en_ssim], if: false
    config.add_facet_field 'type_pivot_ar', pivot: %w[cho_edm_type.ar-Arab_ssim cho_has_type.ar-Arab_ssim], if: false

    config.add_facet_field 'contributor_pivot_en',
                           pivot: %w[agg_provider.en_ssim agg_provider_country.en_ssim agg_data_provider_collection_ssim],
                           if: false
    config.add_facet_field 'contributor_pivot_ar',
                           pivot: %w[
                             agg_provider.ar-Arab_ssim
                             agg_provider_country.ar-Arab_ssim
                             agg_data_provider_collection_ssim
                           ],
                           if: false

    config.add_facet_field 'language_ar',    field: 'cho_language.ar-Arab_ssim', limit: true, if: arabic_locale
    config.add_facet_field 'language_en',    field: 'cho_language.en_ssim', limit: true, if: en_locale
    config.add_facet_field 'type_ar',    field: 'cho_edm_type.ar-Arab_ssim', limit: true, if: arabic_locale
    config.add_facet_field 'type_en',    field: 'cho_edm_type.en_ssim', limit: true, if: en_locale
    config.add_facet_field 'other type', field: 'cho_type_ssim', limit: true
    config.add_facet_field 'spatial',    field: 'cho_spatial_ssim', limit: true
    config.add_facet_field 'temporal',   field: 'cho_temporal_ssim', limit: true
    config.add_facet_field 'source_date', field: 'cho_date_ssim', limit: true
    # Using an explicit partial for the date ranges so the configuration works for the home page
    config.add_facet_field 'cho_date_range_norm_isim',
                           field: 'cho_date_range_norm_isim',
                           range: true,
                           partial: 'blacklight_range_limit/range_limit_panel'
    config.add_facet_field 'cho_date_range_hijri_isim',
                           field: 'cho_date_range_hijri_isim',
                           range: true,
                           partial: 'blacklight_range_limit/range_limit_panel'
    config.add_facet_field 'creator',     field: 'cho_creator_ssim', limit: true
    config.add_facet_field 'contributor', field: 'cho_contributor_ssim', limit: true
    config.add_facet_field 'medium',      field: 'cho_medium_ssim', limit: true
    config.add_facet_field 'dc_rights',   field: 'cho_dc_rights_ssim', limit: true
    config.add_facet_field 'agg_data_provider_ar',    field: 'agg_data_provider.ar-Arab_ssim', limit: true, if: arabic_locale
    config.add_facet_field 'agg_data_provider_en',    field: 'agg_data_provider.en_ssim', limit: true, if: en_locale
    config.add_facet_field 'agg_provider_ar',    field: 'agg_provider.ar-Arab_ssim', limit: true, if: arabic_locale
    config.add_facet_field 'agg_provider_en',    field: 'agg_provider.en_ssim', limit: true, if: en_locale
    config.add_facet_field 'agg_provider_country_ar', field: 'agg_provider_country.ar-Arab_ssim', if: false
    config.add_facet_field 'agg_provider_country_en', field: 'agg_provider_country.en_ssim', if: false
    config.add_facet_field 'cho_type_facet.en_ssim',
                           partial: 'blacklight/hierarchy/facet_hierarchy',
                           label: 'Type en',
                           if: en_locale,
                           limit: -1 # unlimited
    config.add_facet_field 'cho_type_facet.ar-Arab_ssim',
                           partial: 'blacklight/hierarchy/facet_hierarchy',
                           label: 'Type ar',
                           if: arabic_locale,
                           limit: -1 # unlimited
    config.facet_display = {
      hierarchy: {
        'cho_type_facet.en' => [['ssim'], ':'],
        'cho_type_facet.ar-Arab' => [['ssim'], ':']
      }
    }

    config.add_facet_field 'thumbnail', query: {
      yes: { label: 'Yes', fq: 'agg_preview.wr_id_ssim:[* TO *]' },
      no: { label: 'No', fq: '-agg_preview.wr_id_ssim:[* TO *]' }
    }
    config.add_facet_field 'shown at', query: {
      yes: { label: 'Yes', fq: 'agg_is_shown_at.wr_id_ssim:[* TO *]' },
      no: { label: 'No', fq: '-agg_is_shown_at.wr_id_ssim:[* TO *]' }
    }
    config.add_facet_field 'shown by', query: {
      yes: { label: 'Yes', fq: 'agg_is_shown_by.wr_id_ssim:[* TO *]' },
      no: { label: 'No', fq: '-agg_is_shown_by.wr_id_ssim:[* TO *]' }
    }
    config.add_facet_field 'empty fields', query: {
      no_cho_title: { label: 'No CHO Title', fq: '-cho_title_ssim:[* TO *]' },
      no_cho_edm_type: { label: 'No CHO Type', fq: '-cho_edm_type_ssim:[* TO *]' },
      no_cho_dc_rights: { label: 'No CHO DC Rights', fq: '-cho_dc_rights_ssim:[* TO *]' },
      no_agg_edm_rights: { label: 'No Agg EDM Rights', fq: '-agg_edm_rights_ssim:[* TO *]' },
      no_agg_provider: { label: 'No Source Institution', fq: '-agg_provider_ssim:[* TO *]' },
      no_agg_data_provider: { label: 'No Holding Institution', fq: '-agg_data_provider_ssim:[* TO *]' }
    }
    config.add_facet_field 'indexed at', query: {
      day: { label: 'within 1 day', fq: "timestamp:[#{(Time.zone.now - 1.day).iso8601} TO *]" },
      week: { label: 'within 7 days', fq: "timestamp:[#{(Time.zone.now - 7.days).iso8601} TO *]" },
      month: { label: 'within 31 days', fq: "timestamp:[#{(Time.zone.now - 31.days).iso8601} TO *]" }
    }
    config.add_facet_field 'traject config', field: 'traject_context_source_ssim', limit: true
    config.add_facet_field 'harvest', field: 'traject_context_harvest_id_ssim', limit: true

    # Have BL send all facet field names to Solr, which has been the default
    # previously. Simply remove these lines if you'd rather use Solr request
    # handler defaults, or have no facets.
    config.add_facet_fields_to_solr_request!

    config.add_show_field 'contributor', **multilingual_locale_aware_field('cho_contributor')
    config.add_show_field 'alternative', **multilingual_locale_aware_field('cho_alternative')
    config.add_show_field 'coverage', **multilingual_locale_aware_field('cho_coverage')
    config.add_show_field 'dc_rights', **multilingual_locale_aware_field('cho_dc_rights'), autolink: true
    config.add_show_field 'edm_type', **multilingual_locale_aware_field('cho_edm_type')
    config.add_show_field 'format', **multilingual_locale_aware_field('cho_format')
    config.add_show_field 'has_part', **multilingual_locale_aware_field('cho_has_part')
    config.add_show_field 'has_type', **multilingual_locale_aware_field('cho_has_type')
    config.add_show_field 'identifier', **multilingual_locale_aware_field('cho_identifier')
    config.add_show_field 'is_part_of', **multilingual_locale_aware_field('cho_is_part_of'), autolink: true
    config.add_show_field 'publisher', **multilingual_locale_aware_field('cho_publisher')
    config.add_show_field 'relation', **multilingual_locale_aware_field('cho_relation')
    config.add_show_field 'same_as', **multilingual_locale_aware_field('cho_same_as'), autolink: true
    config.add_show_field 'subject', **multilingual_locale_aware_field('cho_subject')
    config.add_show_field 'type', **multilingual_locale_aware_field('cho_type')
    config.add_show_field 'type_en', field: 'cho_type_facet.en_ssim', helper_method: :link_type_hierarchy, if: en_locale
    config.add_show_field 'type_ar', field: 'cho_type_facet.ar-Arab_ssim', helper_method: :link_type_hierarchy, if: arabic_locale

    config.add_show_field '__source', field: '__source_ssim'
    config.add_show_field 'agg_dc_rights', **multilingual_locale_aware_field('agg_dc_rights')
    config.add_show_field 'agg_edm_rights', **multilingual_locale_aware_field('agg_edm_rights'), autolink: true
    config.add_show_field 'agg_provider institution', **multilingual_locale_aware_field('agg_provider')
    config.add_show_field 'agg_is_shown_at', field: 'agg_is_shown_at.wr_id_ssim', autolink: true

    config.add_search_field 'all_fields', label: 'Everything'
    config.add_search_field 'title', label: 'Title' do |field|
      field.solr_local_parameters = {
        qf: '$qf_title'
      }
    end
    config.add_search_field 'author', label: 'Creator / Contributor' do |field|
      field.solr_local_parameters = {
        qf: '$author_qf'
      }
    end

    config.add_sort_field 'relevance', sort: 'score desc, sortable_cho_title_ssi asc', label: 'Relevance'
    config.add_sort_field 'title', sort: 'sortable_cho_title_ssi asc, sortable_cho_creator_ssi asc', label: 'Title'
    config.add_sort_field 'creator', sort: 'sortable_cho_creator_ssi asc, sortable_cho_creator_ssi asc', label: 'Creator'

    config.add_field_configuration_to_solr_request!
  end

  private

  def lang_config
    @lang_config ||= {
      'ar' => [%w[ar-Arab ar-Latn], default: (%w[en none] + Settings.acceptable_bcp47_codes).uniq],
      'en' => ['en', default: (%w[ar-Arab ar-Latn none] + Settings.acceptable_bcp47_codes).uniq]
    }.with_indifferent_access
  end

  def multilingual_locale_aware_field field_prefix, suffix = 'ssim'
    {
      pattern: "#{field_prefix}.%<lang>s_#{suffix}",
      values: lambda do |field_config, document|
        pref_langs, options = lang_config[I18n.locale]

        values = Array.wrap(pref_langs).flatten.map do |lang|
          subfield_config = field_config.merge(field: format(field_config.pattern, lang: lang), values: nil)
          Blacklight::FieldRetriever.new(document, subfield_config).fetch
        end

        if values.none?(&:any?)
          values = Array.wrap(options[:default]).flatten.map do |lang|
            subfield_config = field_config.merge(field: format(field_config.pattern, lang: lang), values: nil)
            Blacklight::FieldRetriever.new(document, subfield_config).fetch
          end
        end

        if values.none?(&:any?)
          subfield_config = field_config.merge(field: "#{field_prefix}_#{suffix}", values: nil)
          values = Blacklight::FieldRetriever.new(document, subfield_config).fetch
        end

        if field_config.first
          values.find(&:any?)
        else
          values.flatten
        end
      end
    }
  end
end
