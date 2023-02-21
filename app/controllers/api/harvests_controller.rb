# frozen_string_literal: true

module Api
  # Initiate a harvest via the API (e.g. from Airflow)
  class HarvestsController < ApiController
    delegate :t, to: :I18n

    def create
      if request.headers['Authorization'] != ENV.fetch('API_SECRET', '')
        return render json: { error: t('api.harvest.unauthorized') }, status: :unauthorized
      end

      return render json: { error: t('api.harvest.no_url') }, status: :bad_request if params['url'].blank?

      return render json: { error: t('api.harvest.no_file') }, status: :bad_request unless File.exist?(filepath)

      return render json: { error: t('api.harvest.duplicate_ids') }, status: :unprocessable_entity if any_duplicate_identifiers?

      AddResourcesJob.perform_later filepath, exhibit: current_exhibit, local: true

      render json: { message: t('api.harvest.success') }, status: :accepted
    end

    private

    def any_duplicate_identifiers?
      NdjsonNormalizer.new(body, filename).any_duplicate_identifiers?
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

    # DLME only has one exhibit
    def current_exhibit
      @current_exhibit ||= Spotlight::Exhibit.first
    end
  end
end
