# frozen_string_literal: true

# Creating new DLME JSON items by loading from a file in the data_dir.
class HarvestsController < ApplicationController
  include Spotlight::Concerns::ApplicationController
  before_action :authenticate_user!

  load_and_authorize_resource :exhibit, class: Spotlight::Exhibit

  def create
    authorize! :create, DlmeJson

    if any_duplicate_identifiers?
      return redirect_to spotlight.new_exhibit_resource_path(current_exhibit),
                         flash: { error: t('dlme_s3s.form.error') }
    end

    AddResourcesJob.perform_later filepath, exhibit: current_exhibit, local: true
    redirect_to spotlight.admin_exhibit_catalog_path(current_exhibit),
                notice: t('spotlight.resources.fetch.queued')
  end

  private

  def any_duplicate_identifiers?
    ids = NdjsonNormalizer
          .normalize(body, filename)
          .pluck('id')
          .compact_blank
    ids.size != ids.uniq.size
  end

  def body
    File.read(filepath)
  end

  def filepath
    File.join(Settings.data_dir, filename)
  end

  def filename
    ActiveStorage::Filename.new(params['url']).sanitized
  end
end
