# frozen_string_literal: true

##
# Creating new DLME JSON items by fetching from url
class S3HarvesterController < Spotlight::ApplicationController
  before_action :authenticate_user!

  load_and_authorize_resource :exhibit, class: Spotlight::Exhibit

  # rubocop:disable Metrics/AbcSize
  def create
    authorize! :create, DlmeJson

    if any_duplicate_identifiers?
      return redirect_to spotlight.new_exhibit_resource_path(current_exhibit),
                         flash: { error: t('dlme_s3s.form.error') }
    end

    FetchResourcesJob.perform_later params['url'], current_exhibit
    redirect_to spotlight.admin_exhibit_catalog_path(current_exhibit),
                notice: t('spotlight.resources.fetch.queued')
  end
  # rubocop:enable Metrics/AbcSize

  private

  def any_duplicate_identifiers?
    ids = NdjsonNormalizer
          .normalize(body, params['url'])
          .pluck('id')
          .reject(&:blank?)
    ids.size != ids.uniq.size
  end

  def body
    Faraday.get(params['url']).body
  end
end
