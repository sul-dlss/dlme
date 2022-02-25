# frozen_string_literal: true

##
# Simplified catalog controller
class CatalogController < ApplicationController
  include Blacklight::Catalog
  include BlacklightRangeLimit::ControllerOverride
  extend MultilingualLocaleAwareField

  before_action do
    blacklight_config.bulk_actions&.delete_resources!

    next unless request.format.json?

    blacklight_config.add_show_field :__raw_resource_json_ss, helper_method: :ir_for_output
  end

  configure_blacklight do |config|
    # Use POST requests for solr to avoid limits on query length
    config.http_method = :post

    # Disable bookmarks
    config.index.document_actions[:bookmark].if = false
    config.show.document_actions[:bookmark].if = false

    # Remove bookmark/saved searches/history from the navbar
    config.navbar.partials = {}

    config.show.oembed_field = :'agg_is_shown_at.wr_id_ssim'
    config.show.partials = %i[show_header show_with_viewer ir_view record_feedback]

    config.view.list.partials = %i[thumbnail index_header index]
    config.view.gallery document_component: Blacklight::Gallery::DocumentComponent
    config.view.masonry document_component: Blacklight::Gallery::DocumentComponent
    config.view.slideshow document_component: Blacklight::Gallery::SlideshowComponent

    config.add_results_collection_tool(:sort_widget)
    config.add_results_collection_tool(:per_page_widget)
    config.add_results_collection_tool(:view_type_group)

    config.show.tile_source_field = :content_metadata_image_iiif_info_ssm
    ## Default parameters to send to solr for all search-like requests. See also SolrHelper#solr_search_params
    config.default_solr_params = {
      qt: 'search',
      rows: 12,
      fl: '*'
    }

    # Maximum number of results to show per page
    config.max_per_page = 96
    # Options for the user for number of results to show per page
    config.per_page = [12, 24, 48, 96]

    config.document_solr_path = 'get'
    config.document_unique_id_param = 'ids'
    config.raw_endpoint.enabled = true

    config.index.title_field = Blacklight::Configuration::Field.new(first: true, **multilingual_locale_aware_field('cho_title'))
    config.show.html_title_field = Blacklight::Configuration::Field.new(
      first: true,
      no_html: true,
      **multilingual_locale_aware_field('cho_title')
    )

    config.index.document_presenter_class = DlmeIndexPresenter
    config.show.document_presenter_class = DlmeShowPresenter

    config.index.thumbnail_field = 'agg_preview.wr_id_ssim'
    config.index.default_thumbnail = 'default.png'

    config.add_index_field 'title', **multilingual_locale_aware_field('cho_title')

    config.add_index_field 'date_range', helper_method: :display_date_ranges, values: (lambda do |_field_config, document, _|
      if document.has?('cho_date_range_norm_isim') || document.has?('cho_date_range_hijri_isim')
        {
          gregorian: document.fetch('cho_date_range_norm_isim', []),
          hijri: document.fetch('cho_date_range_hijri_isim', [])
        }
      end
    end)

    config.add_index_field 'date', **multilingual_locale_aware_field('cho_date')
    config.add_index_field 'holding_institution', **multilingual_locale_aware_field('agg_data_provider')
    config.add_index_field 'source_institution', **multilingual_locale_aware_field('agg_provider')

    config.add_index_field 'extent', **multilingual_locale_aware_field('cho_extent')
    config.add_index_field 'creator', **multilingual_locale_aware_field('cho_creator')
    config.add_index_field 'description',
                           **multilingual_locale_aware_field('cho_description'),
                           autolink: true,
                           paragraph: true,
                           join_with: '',
                           collapse: true
    config.add_index_field 'language', **multilingual_locale_aware_field('cho_language')
    config.add_index_field 'medium', **multilingual_locale_aware_field('cho_medium')
    config.add_index_field 'provenance',
                           **multilingual_locale_aware_field('cho_provenance'),
                           paragraph: true,
                           join_with: ''
    config.add_index_field 'source', **multilingual_locale_aware_field('cho_source')
    config.add_index_field 'spatial', **multilingual_locale_aware_field('cho_spatial'), collapse: true
    config.add_index_field 'temporal', **multilingual_locale_aware_field('cho_temporal')

    arabic_locale = lambda do |context, *_|
      context.is_a?(Spotlight::SearchConfigurationsController) ||
        I18n.locale == :ar
    end
    en_locale = lambda do |context, *_|
      context.is_a?(Spotlight::SearchConfigurationsController) ||
        I18n.locale == :en
    end

    config.add_facet_field 'language_ar',    field: 'cho_language.ar-Arab_ssim', limit: true, if: arabic_locale
    config.add_facet_field 'language_en',    field: 'cho_language.en_ssim', limit: true, if: en_locale
    config.add_facet_field 'type_ar',    field: 'cho_edm_type.ar-Arab_ssim', limit: true, if: arabic_locale
    config.add_facet_field 'type_en',    field: 'cho_edm_type.en_ssim', limit: true, if: en_locale
    config.add_facet_field 'other_type', field: 'cho_type_ssim', limit: true
    config.add_facet_field 'spatial',    field: 'cho_spatial_ssim', limit: true
    config.add_facet_field 'temporal',   field: 'cho_temporal_ssim', limit: true
    config.add_facet_field 'source_date', field: 'cho_date_ssim', limit: true
    # Using an explicit partial for the date ranges so the configuration works for the home page
    config.add_facet_field 'cho_date_range_norm_isim',
                           field: 'cho_date_range_norm_isim',
                           range: true,
                           partial: 'blacklight_range_limit/custom_range_limit_panel',
                           configured_range_fields: [
                             { field: 'cho_date_range_norm_isim', type: 'gregorian' },
                             { field: 'cho_date_range_hijri_isim', type: 'hijri' }
                           ],
                           if: proc { |context, field_config, _response| !(context.respond_to?(:has_range_limit_parameters?) && context.has_range_limit_parameters?) || context.params.dig('range', field_config.field).present? } # rubocop:disable Layout/LineLength
    config.add_facet_field 'cho_date_range_hijri_isim',
                           field: 'cho_date_range_hijri_isim',
                           range: true,
                           partial: 'blacklight_range_limit/custom_range_limit_panel',
                           configured_range_fields: [
                             { field: 'cho_date_range_norm_isim', type: 'gregorian' },
                             { field: 'cho_date_range_hijri_isim', type: 'hijri' }
                           ],
                           if: proc { |context, field_config, _response| context.is_a?(Spotlight::SearchConfigurationsController) || context.params.dig('range', field_config.field).present? } # rubocop:disable Layout/LineLength
    config.add_facet_field 'creator',     field: 'cho_creator_ssim', limit: true
    config.add_facet_field 'contributor', field: 'cho_contributor_ssim', limit: true
    config.add_facet_field 'medium',      field: 'cho_medium_ssim', limit: true
    config.add_facet_field 'dc_rights',   field: 'cho_dc_rights_ssim', limit: true
    config.add_facet_field 'agg_data_provider_ar',    field: 'agg_data_provider.ar-Arab_ssim', limit: true, if: arabic_locale
    config.add_facet_field 'agg_data_provider_en',    field: 'agg_data_provider.en_ssim', limit: true, if: en_locale
    config.add_facet_field 'agg_provider_ar',    field: 'agg_provider.ar-Arab_ssim', limit: true, if: arabic_locale
    config.add_facet_field 'agg_provider_en',    field: 'agg_provider.en_ssim', limit: true, if: en_locale
    config.add_facet_field 'cho_type_facet.en_ssim',
                           component: Blacklight::Hierarchy::FacetFieldListComponent,
                           label: 'Type en',
                           if: en_locale,
                           limit: -1 # unlimited
    config.add_facet_field 'cho_type_facet.ar-Arab_ssim',
                           component: Blacklight::Hierarchy::FacetFieldListComponent,
                           label: 'Type ar',
                           if: arabic_locale,
                           limit: -1 # unlimited
    config.facet_display = {
      hierarchy: {
        'cho_type_facet.en' => [['ssim'], ':'],
        'cho_type_facet.ar-Arab' => [['ssim'], ':']
      }
    }
    config.add_facet_field 'cho_coverage', field: 'cho_coverage_ssim', limit: true
    config.add_facet_field 'agg_data_provider_collection_ar', field: 'agg_data_provider_collection.ar-Arab_ssim',
                                                              limit: true, if: arabic_locale
    config.add_facet_field 'agg_data_provider_collection_en', field: 'agg_data_provider_collection.en_ssim', limit: true,
                                                              if: en_locale
    config.add_facet_field 'agg_data_provider_collection_id', field: 'agg_data_provider_collection_id_ssim', limit: true
    config.add_facet_field 'cho_subject_ar', field: 'cho_subject.ar-Arab_ssim', limit: true, if: arabic_locale
    config.add_facet_field 'cho_subject_en', field: 'cho_subject.en_ssim', limit: true, if: en_locale
    config.add_facet_field 'cho_subject', field: 'cho_subject_ssim', limit: true
    config.add_facet_field 'agg_is_shown_at_agg_edm_rights', field: 'agg_is_shown_at.agg_edm_rights_ssim', limit: true
    config.add_facet_field 'agg_preview_agg_edm_rights', field: 'agg_preview.agg_edm_rights_ssim', limit: true
    config.add_facet_field 'agg_edm_rights', field: 'agg_edm_rights_ssim', limit: true
    config.add_facet_field 'agg_dc_rights', field: 'agg_dc_rights_ssim', limit: true
    config.add_facet_field 'agg_is_shown_at_wr_dc_rights', field: 'agg_is_shown_at.wr_dc_rights_ssim', limit: true
    config.add_facet_field 'agg_preview_wr_dc_rights', field: 'agg_preview.wr_dc_rights_ssim', limit: true
    config.add_facet_field 'agg_is_shown_at_wr_edm_rights', field: 'agg_is_shown_at.wr_edm_rights_ssim', limit: true
    config.add_facet_field 'agg_is_shown_by_wr_edm_rights', field: 'agg_is_shown_by.wr_edm_rights_ssim', limit: true
    config.add_facet_field 'agg_preview_wr_edm_rights', field: 'agg_preview.wr_edm_rights_ssim', limit: true

    logged_in = ->(context, *) { context.current_exhibit && context.can?(:curate, context.current_exhibit) }

    config.add_facet_field 'thumbnail', query: {
      yes: { label: 'Yes', fq: 'agg_preview.wr_id_ssim:[* TO *]' },
      no: { label: 'No', fq: '-agg_preview.wr_id_ssim:[* TO *]' }
    }, if: logged_in
    config.add_facet_field 'shown_at', query: {
      yes: { label: 'Yes', fq: 'agg_is_shown_at.wr_id_ssim:[* TO *]' },
      no: { label: 'No', fq: '-agg_is_shown_at.wr_id_ssim:[* TO *]' }
    }, if: logged_in
    config.add_facet_field 'shown_by', query: {
      yes: { label: 'Yes', fq: 'agg_is_shown_by.wr_id_ssim:[* TO *]' },
      no: { label: 'No', fq: '-agg_is_shown_by.wr_id_ssim:[* TO *]' }
    }, if: logged_in
    config.add_facet_field 'empty_fields', query: {
      no_cho_title: { label: 'No CHO Title', fq: '-cho_title_ssim:[* TO *]' },
      no_cho_edm_type: { label: 'No CHO Type', fq: '-cho_edm_type_ssim:[* TO *]' },
      no_cho_dc_rights: { label: 'No CHO DC Rights', fq: '-cho_dc_rights_ssim:[* TO *]' },
      no_agg_edm_rights: { label: 'No Agg EDM Rights', fq: '-agg_edm_rights_ssim:[* TO *]' },
      no_agg_provider: { label: 'No Source Institution', fq: '-agg_provider_ssim:[* TO *]' },
      no_agg_data_provider: { label: 'No Holding Institution', fq: '-agg_data_provider_ssim:[* TO *]' }
    }, if: logged_in
    config.add_facet_field 'indexed_at', query: {
      day: { label: 'within 1 day', fq: "timestamp:[#{1.day.ago.iso8601} TO *]" },
      week: { label: 'within 7 days', fq: "timestamp:[#{7.days.ago.iso8601} TO *]" },
      month: { label: 'within 31 days', fq: "timestamp:[#{31.days.ago.iso8601} TO *]" }
    }, if: logged_in
    config.add_facet_field 'traject_config', field: 'traject_context_source_ssim', limit: true, if: logged_in
    config.add_facet_field 'harvest', field: 'traject_context_harvest_id_ssim', limit: true, if: logged_in

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
    config.add_show_field 'subject', **multilingual_locale_aware_field('cho_subject'), collapse: true
    config.add_show_field 'type', **multilingual_locale_aware_field('cho_type')
    config.add_show_field 'type_hierarchy',
                          **multilingual_locale_aware_field('cho_type_facet'),
                          helper_method: :link_type_hierarchy

    config.add_show_field '__source', field: '__source_ssim'
    config.add_show_field 'agg_dc_rights', **multilingual_locale_aware_field('agg_dc_rights')
    config.add_show_field 'agg_edm_rights', **multilingual_locale_aware_field('agg_edm_rights'), autolink: true
    config.add_show_field 'agg_provider institution', **multilingual_locale_aware_field('agg_provider')
    config.add_show_field 'agg_is_shown_at', field: 'agg_is_shown_at.wr_id_ssim', autolink: true

    config.add_search_field 'all_fields', label: 'Everything'
    config.add_search_field 'title', label: 'Title' do |field|
      field.solr_parameters = {
        qf: '${title_qf}',
        pf: '${title_pf}'
      }
    end
    config.add_search_field 'author', label: 'Creator / Contributor' do |field|
      field.solr_parameters = {
        qf: '${author_qf}',
        pf: '${author_pf}'
      }
    end
    config.add_search_field 'identifier', label: 'Identifier' do |field|
      field.solr_parameters = {
        qf: '${identifier_qf}',
        pf: '${identifier_pf}',
        pf2: '${identifier_pf2}',
        pf3: '${identifier_pf3}'
      }
    end

    config.add_sort_field 'relevance', sort: 'score desc, sortable_cho_title_ssi asc', label: 'Relevance'
    config.add_sort_field 'title', sort: 'sortable_cho_title_ssi asc, sortable_cho_creator_ssi asc', label: 'Title'
    config.add_sort_field 'creator', sort: 'sortable_cho_creator_ssi asc', label: 'Creator'
    config.add_sort_field 'date_old_to_new', sort: 'cho_date_norm_min_isi asc, sortable_cho_title_ssi asc',
                                             label: 'Date (old to new)'
    config.add_sort_field 'date_new_to_old', sort: 'cho_date_norm_max_isi desc, sortable_cho_title_ssi asc',
                                             label: 'Date (new to old)'

    config.add_field_configuration_to_solr_request!
  end

  def show
    if params[:raw]
      raw
    else
      super
    end
  end
end
