# frozen_string_literal: true

module Api
  # Initiate a harvest via the API (e.g. from Airflow)
  class HarvestsController < ApiController
    delegate :t, to: :I18n

    def create
      upload = NdjsonUpload.new(params[:url])

      if upload.valid?
        AddResourcesJob.perform_later upload.filepath, exhibit: current_exhibit, local: true

        render json: { message: t('api.harvest.success') }, status: :accepted
      else
        handle_error upload.error
      end
    end

    private

    def handle_error(error)
      case error
      when :no_url
        no_url
      when :duplicate_ids
        duplicate_ids
      when :file_not_found
        file_not_found
      else
        unknown_error
      end
    end

    def duplicate_ids
      render json: { error: t('api.harvest.duplicate_ids') }, status: :unprocessable_entity
    end

    def file_not_found
      render json: { error: t('api.harvest.no_file') }, status: :bad_request
    end

    def no_url
      render json: { error: t('api.harvest.no_url') }, status: :bad_request
    end

    def unknown_error
      render json: { error: t('api.harvest.unknown_error') }, status: :internal_server_error
    end

    # DLME only has one exhibit
    def current_exhibit
      Spotlight::Exhibit.first
    end
  end
end
