# frozen_string_literal: true

# Import metadata from configured sources
class ImportJob < ApplicationJob
  queue_as :default

  def perform(harvest)
    Settings.import.sources.each do |pipeline_name, config|
      GithubImportJob.perform_later(harvest, pipeline_name, config)
    end
  end
end
