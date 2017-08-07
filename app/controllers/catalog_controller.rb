# frozen_string_literal: true

##
# Simplified catalog controller
class CatalogController < ApplicationController
  include Blacklight::Catalog

  configure_blacklight do |config|
    config.show.oembed_field = :oembed_url_ssm
    config.show.partials.insert(1, :oembed)

    config.view.gallery.partials = %i[index_header index]
    config.view.masonry.partials = [:index]
    config.view.slideshow.partials = [:index]

    config.show.tile_source_field = :content_metadata_image_iiif_info_ssm
    config.show.partials.insert(1, :openseadragon)
    ## Default parameters to send to solr for all search-like requests. See also SolrHelper#solr_search_params
    config.default_solr_params = {
      qt: 'search',
      rows: 10,
      fl: '*,agg_is_shown_by_ssm:[json]'
    }

    config.document_solr_path = 'get'
    config.document_unique_id_param = 'ids'

    # solr field configuration for search results/index views
    config.index.title_field = 'cho_title_ssim'

    config.add_index_field 'title',       field: 'cho_title_ssim'
    config.add_index_field 'date',        field: 'cho_date_ssim'
    config.add_index_field 'provided_by', field: 'agg_data_provider_ssim'
    config.add_index_field 'extent',      field: 'cho_extent_ssim'

    config.add_facet_field 'language',   field: 'cho_language_ssim'
    config.add_facet_field 'type',       field: 'cho_edm_type_ssim'
    config.add_facet_field 'other type', field: 'cho_type_ssim'

    # Have BL send all facet field names to Solr, which has been the default
    # previously. Simply remove these lines if you'd rather use Solr request
    # handler defaults, or have no facets.
    config.add_facet_fields_to_solr_request!

    config.add_show_field 'title',       field: 'cho_title_ssim'
    config.add_show_field 'date',        field: 'cho_date_ssim'
    config.add_show_field 'provided_by', field: 'agg_data_provider_ssim'
    config.add_show_field 'extent',      field: 'cho_extent_ssim'

    config.add_search_field 'all_fields', label: 'Everything'

    config.add_sort_field 'relevance', sort: 'score desc', label: 'Relevance'

    config.add_field_configuration_to_solr_request!
  end
end
