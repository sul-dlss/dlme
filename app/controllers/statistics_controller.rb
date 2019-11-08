# frozen_string_literal: true

##
# A controller for the public facing statistics page for the DLME Exhibit
class StatisticsController < Spotlight::ApplicationController
  before_action :attach_breadcrumbs
  before_action do
    authorize!(:read, current_exhibit)
  end

  def show; end

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
