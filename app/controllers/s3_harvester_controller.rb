# frozen_string_literal: true

##
# Creating new DLME JSON items by fetching from url
class S3HarvesterController < Spotlight::ApplicationController
  before_action :authenticate_user!

  load_and_authorize_resource :exhibit, class: Spotlight::Exhibit

  def create
    authorize! :create, DlmeJson
    FetchResourcesJob.perform_later params['url'], current_exhibit
    redirect_to spotlight.admin_exhibit_catalog_path(current_exhibit),
                notice: t('spotlight.resources.fetch.queued')
  end
end
