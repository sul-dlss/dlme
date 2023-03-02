# frozen_string_literal: true

##
# A controller for the public facing statistics page for the DLME Exhibit
class StatisticsController < ApplicationController
  include Spotlight::Concerns::ApplicationController
  include Spotlight::SearchHelper

  before_action :attach_breadcrumbs
  before_action do
    authorize!(:read, current_exhibit)

    blacklight_config.facet_fields.clear
    blacklight_config.index_fields.clear
    blacklight_config.show_fields.clear
    blacklight_config.sort_fields.clear
  end

  def index
    @statistics_dashboard = StatisticsDashboard.new(search_service: search_service)
  end

  # rubocop:disable Metrics/AbcSize
  def show
    provider_facet_field = "agg_provider_#{I18n.locale}"
    results = CatalogController.search_service_class.new(
      config: CatalogController.blacklight_config,
      user_params: { f: { provider_facet_field => params[provider_facet_field] } }
    ).search_results
    @provider_collection_field = "agg_data_provider_collection.#{StatisticsDashboard.mapped_locale}_ssim"
    @rows = results.facet_counts['facet_fields'][@provider_collection_field].each_slice(2)

    collections_id = Digest::MD5.hexdigest params[provider_facet_field]

    render turbo_stream: turbo_stream.replace(collections_id, partial: 'collection')
  end
  # rubocop:enable Metrics/AbcSize

  private

  def attach_breadcrumbs
    nav = current_exhibit.main_navigations.find_by(nav_type: 'statistics')
    add_breadcrumb(
      t(:'spotlight.curation.nav.home', title: current_exhibit.title),
      spotlight.exhibit_home_page_path(current_exhibit)
    )
    add_breadcrumb(nav.label_or_default, exhibit_statistics_path(current_exhibit))
  end
end
