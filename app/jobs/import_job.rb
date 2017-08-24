# frozen_string_literal: true

# Import metadata from configured sources
class ImportJob < ApplicationJob
  def perform(harvest)
    Settings.import.sources.keys.each do |pipeline_name|
      GithubImportJob.perform_later(harvest, pipeline_name.to_s)
    end
  end
end
