# frozen_string_literal: true

module Api
  # Initiate a harvest via the API (e.g. from Airflow)
  class HarvestsController < ApiController
    delegate :t, to: :I18n

    def create
      upload = build_upload

      if upload.valid?
        upload.write if upload.is_a?(NdjsonParse)
        AddResourcesJob.perform_later upload.filepath, exhibit: current_exhibit, local: true

        render json: { message: t('api.harvest.success') }, status: :accepted
      else
        handle_error upload.error
      end
    end

    private

    def build_upload
      if params.key?(:content)
        NdjsonParse.new(params[:content])
      else
        NdjsonUpload.new(params[:url])
      end
    end

    def handle_error(error)
      send(error_handler(error))
    end

    def error_handler(error)
      { no_url: :no_url, no_body: :no_content, duplicate_ids: :duplicate_ids,
        file_not_found: :file_not_found, invalid_json: :invalid_json }.fetch(error, :unknown_error)
    end

    def duplicate_ids
      render json: { error: t('api.harvest.duplicate_ids') }, status: :unprocessable_content
    end

    def file_not_found
      render json: { error: t('api.harvest.no_file') }, status: :bad_request
    end

    def invalid_json
      render json: { error: t('api.harvest.invalid_json') }, status: :unprocessable_content
    end

    def no_content
      render json: { error: t('api.harvest.no_content') }, status: :bad_request
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
