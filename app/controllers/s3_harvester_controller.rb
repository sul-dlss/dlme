# frozen_string_literal: true

##
# Creating new DLME JSON items by fetching from url
class S3HarvesterController < Spotlight::ApplicationController
  before_action :authenticate_user!

  load_and_authorize_resource :exhibit, class: Spotlight::Exhibit

  def create
    authorize! :create, DlmeJson
    created = create_items(params['url'])
    created.error ? on_error_redirect(created) : on_success_redirect(created)
  end

  private

  BatchCreateResponse = Struct.new(:error, :count)

  # rubocop:disable Metrics/AbcSize
  def create_items(url)
    resp = fetch(url)
    return BatchCreateResponse.new(t('spotlight.resources.fetch.error'), nil) unless resp&.success?

    items = resp.body.split("\n")

    items.each_with_index do |item, index|
      object = DlmeJson.new(data: { json: item }, exhibit: current_exhibit)
      return BatchCreateResponse.new(t('spotlight.resources.create.error', index: index + 1), nil) unless object.valid?

      object.save_and_index
    end
    BatchCreateResponse.new(nil, items.count)
  end
  # rubocop:enable Metrics/AbcSize

  def on_error_redirect(created)
    redirect_to spotlight.new_exhibit_resource_path(current_exhibit),
                flash: { error: created.error }
  end

  def on_success_redirect(created)
    redirect_to spotlight.admin_exhibit_catalog_path(current_exhibit),
                notice: t('spotlight.resources.create.success', index: created.count)
  end

  def fetch(url)
    Faraday.get(url)
  rescue Faraday::ClientError
    nil
  end
end
