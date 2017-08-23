# frozen_string_literal: true

require 'github_importer'

# Imports files from a Github directory, persists them to the database and kicks
# off the associated pipeline for each imported file
class GithubImportJob < ApplicationJob
  # @param harvest [Harvest] the harvest instance this job belongs to.
  # @param pipeline_name [String] the name of the pipeline to use for transformation
  # @param config [Config::Options] configuration options for the pipeline
  def perform(harvest, pipeline_name, config)
    pipeline = Pipeline.for(pipeline_name)
    importer.import(config.directory, harvest, pipeline) do |resource|
      process_resource(resource, config)
    end
  end

  private

  # Now that the resource is harvested, kick off a job to transform it to IR
  def process_resource(resource, config)
    TrajectTransformJob.perform_later(resource, config)
  end

  def github_token
    Settings.import.access_token
  end

  def importer
    GithubImporter.new(github_token, Settings.import.repo)
  end
end
