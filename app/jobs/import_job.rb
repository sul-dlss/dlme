# frozen_string_literal: true

# Import metadata from configured sources
class ImportJob < ApplicationJob
  def perform(harvest)
    # Disable this check because Config::Options is not a Hash
    # rubocop:disable Performance/HashEachMethods
    Settings.import.sources.keys.each do |pipeline_name|
      GithubImportJob.perform_later(harvest, pipeline_name.to_s)
    end
    # rubocop:enable Performance/HashEachMethods
  end
end
