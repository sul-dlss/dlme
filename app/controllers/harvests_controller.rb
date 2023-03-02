# frozen_string_literal: true

# Creating new DLME JSON items by loading from a file in the data_dir.
class HarvestsController < ApplicationController
  include Spotlight::Concerns::ApplicationController

  before_action :authenticate_user!

  load_and_authorize_resource :exhibit, class: Spotlight::Exhibit

  def create
    authorize! :create, DlmeJson

    upload = NdjsonUpload.new(params.require(:url))
    return handle_error(upload.error) unless upload.valid?

    AddResourcesJob.perform_later upload.filepath, exhibit: current_exhibit, local: true

    redirect_to spotlight.admin_exhibit_catalog_path(current_exhibit),
                notice: t('spotlight.resources.fetch.queued')
  end

  def handle_error(error)
    error_message = error_message(error)
    redirect_to spotlight.new_exhibit_resource_path(current_exhibit), flash: { error: error_message }
  end

  def error_message(error)
    # This looks up the i18n string relative to this class
    # i.e. looks up the errors under en.harvests.create.error
    t(".error.#{error}")
  end
end
