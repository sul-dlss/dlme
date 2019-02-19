# frozen_string_literal: true

##
# Creating new DLME JSON items by fetching from url
class S3HarvesterController < Spotlight::ApplicationController
  before_action :authenticate_user!

  load_and_authorize_resource :exhibit, class: Spotlight::Exhibit

  # rubocop:disable Metrics/AbcSize
  # rubocop:disable Metrics/MethodLength
  def create
    authorize! :create, DlmeJson
    resp = fetch(params['url'])
    unless resp&.success?
      flash[:error] = t('spotlight.resources.fetch.error')
      return redirect_to spotlight.new_exhibit_resource_path(current_exhibit)
    end
    items = resp.body.split("\n")
    items.each_with_index do |item, index|
      object = DlmeJson.new(data: { json: item }, exhibit: current_exhibit)
      unless object.valid?
        flash[:error] = t('spotlight.resources.create.error', index: index + 1)
        return redirect_to spotlight.new_exhibit_resource_path(current_exhibit)
      end
      object.save_and_index
    end
    flash[:notice] = t('spotlight.resources.create.success', index: items.count)
    redirect_to spotlight.admin_exhibit_catalog_path(current_exhibit)
  end
  # rubocop:enable Metrics/AbcSize
  # rubocop:enable Metrics/MethodLength

  private

  def fetch(url)
    Faraday.get(url)
  rescue Faraday::ClientError
    nil
  end
end
