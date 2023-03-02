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
    # NdjsonUpload can also return a ":no_url" error, but the harvest controller requires the url, 
    # so we do not need to check for that situation
    case error
    when :duplicate_ids
      t('dlme_s3s.form.error_duplicate_ids')
    when :file_not_found
      t('dlme_s3s.form.error_file_not_found')
    else
      t('dlme_s3s.form.error_unknown')
    end
  end

end
