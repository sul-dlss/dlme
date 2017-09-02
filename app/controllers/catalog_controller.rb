# frozen_string_literal: true

##
# Simplified catalog controller
class CatalogController < ApplicationController
  include Blacklight::Catalog
  configure_blacklight do |config|
    # Disable bookmarks
    config.index.document_actions[:bookmark].if = false
    config.show.document_actions[:bookmark].if = false

    # Remove bookmark/saved searches/history from the navbar
    config.navbar.partials = {}

    config.show.oembed_field = :"agg_is_shown_at.wr_id_ssim"
    config.show.partials.insert(1, :viewer)

    config.view.list.partials = %i[thumbnail index_header index]
    config.view.gallery.partials = %i[index_header index]
    config.view.masonry.partials = [:index]
    config.view.slideshow.partials = [:index]

    config.show.tile_source_field = :content_metadata_image_iiif_info_ssm
    ## Default parameters to send to solr for all search-like requests. See also SolrHelper#solr_search_params
    config.default_solr_params = {
      qt: 'search',
      rows: 10,
      fl: '*'
    }

    config.document_solr_path = 'get'
    config.document_unique_id_param = 'ids'

    # solr field configuration for search results/index views
    config.index.title_field = 'cho_title_ssim'
    config.index.thumbnail_field = 'agg_preview.wr_id_ssim'

    config.add_index_field 'title', field: 'cho_title_ssim'
    config.add_index_field 'date', field: 'cho_date_ssim'
    config.add_index_field 'holding institution', field: 'agg_data_provider_ssim'
    config.add_index_field 'source institution', field: 'agg_provider_ssim'
    config.add_index_field 'extent', field: 'cho_extent_ssim'
    config.add_index_field 'creator', field: 'cho_creator_ssim'
    config.add_index_field 'description',
                           field: 'cho_description_ssim',
                           autolink: true,
                           paragraph: true,
                           join_with: ''
    config.add_index_field 'language', field: 'cho_language_ssim'
    config.add_index_field 'medium', field: 'cho_medium_ssim'
    config.add_index_field 'provenance',
                           field: 'cho_provenance_ssim',
                           paragraph: true,
                           join_with: ''
    config.add_index_field 'source', field: 'cho_source_ssim'
    config.add_index_field 'spatial', field: 'cho_spatial_ssim'
    config.add_index_field 'temporal', field: 'cho_temporal_ssim'

    config.add_facet_field 'language',   field: 'cho_language_ssim', limit: true
    config.add_facet_field 'type',       field: 'cho_edm_type_ssim', limit: true
    config.add_facet_field 'other type', field: 'cho_type_ssim', limit: true
    config.add_facet_field 'spatial',    field: 'cho_spatial_ssim', limit: true
    config.add_facet_field 'temporal',   field: 'cho_temporal_ssim', limit: true
    config.add_facet_field 'date',       field: 'cho_date_ssim', limit: true
    config.add_facet_field 'creator',    field: 'cho_creator_ssim', limit: true
    config.add_facet_field 'contributor', field: 'cho_contributor_ssim', limit: true
    config.add_facet_field 'medium',      field: 'cho_medium_ssim', limit: true
    config.add_facet_field 'dc_rights',   field: 'cho_dc_rights_ssim', limit: true
    config.add_facet_field 'holding_institution', field: 'agg_data_provider_ssim', limit: true

    # "administrative"-like facets
    config.add_facet_field 'source_institution', field: 'agg_provider_ssim', limit: true
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

    config.add_show_field 'title', field: 'cho_title_ssim'
    config.add_show_field 'date', field: 'cho_date_ssim'
    config.add_show_field 'holding_institution', field: 'agg_data_provider_ssim'
    config.add_show_field 'source_institution', field: 'agg_provider_ssim'
    config.add_show_field 'extent', field: 'cho_extent_ssim'
    config.add_show_field 'alternative', field: 'cho_alternative_ssim'
    config.add_show_field 'contributor', field: 'cho_contributor_ssim'
    config.add_show_field 'coverage', field: 'cho_coverage_ssim'
    config.add_show_field 'creator', field: 'cho_creator_ssim'
    config.add_show_field 'dc_rights', field: 'cho_dc_rights_ssim', autolink: true
    config.add_show_field 'description',
                          field: 'cho_description_ssim',
                          autolink: true,
                          paragraph: true,
                          join_with: ''
    config.add_show_field 'edm_type', field: 'cho_edm_type_ssim'
    config.add_show_field 'format', field: 'cho_format_ssim'
    config.add_show_field 'has_part', field: 'cho_has_part_ssim'
    config.add_show_field 'has_type', field: 'cho_has_type_ssim'
    config.add_show_field 'identifier', field: 'cho_identifier_ssim'
    config.add_show_field 'is_part_of', field: 'cho_is_part_of_ssim', autolink: true
    config.add_show_field 'language', field: 'cho_language_ssim'
    config.add_show_field 'medium', field: 'cho_medium_ssim'
    config.add_show_field 'provenance',
                          field: 'cho_provenance_ssim',
                          paragraph: true,
                          join_with: ''
    config.add_show_field 'publisher', field: 'cho_publisher_ssim'
    config.add_show_field 'relation', field: 'cho_relation_ssim'
    config.add_show_field 'same_as', field: 'cho_same_as_ssim', autolink: true
    config.add_show_field 'source', field: 'cho_source_ssim'
    config.add_show_field 'spatial', field: 'cho_spatial_ssim'
    config.add_show_field 'subject', field: 'cho_subject_ssim'
    config.add_show_field 'temporal', field: 'cho_temporal_ssim'
    config.add_show_field 'type', field: 'cho_type_ssim'

    config.add_show_field '__source', field: '__source_ssim'
    config.add_show_field 'agg_dc_rights', field: 'agg_dc_rights_ssim'
    config.add_show_field 'agg_edm_rights', field: 'agg_edm_rights_ssim', autolink: true
    config.add_show_field 'agg_provider', field: 'agg_provider_ssim'
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
end
