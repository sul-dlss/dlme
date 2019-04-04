# frozen_string_literal: true

##
# Delete DLME JSON items by fetching a list from s3
class S3DeleteController < Spotlight::ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource :exhibit, class: Spotlight::Exhibit

  def new
    authorize! :destroy, DlmeJson
  end

  def create
    authorize! :destroy, DlmeJson
    DeleteResourcesJob.perform_later params['url'], current_exhibit
    redirect_to spotlight.admin_exhibit_catalog_path(current_exhibit),
                notice: t('spotlight.resources.fetch.queued')
  end
end
