# frozen_string_literal: true

require 'github_importer'

# Imports files from a Github directory, persists them to the database and kicks
# off the associated pipeline for each imported file
class GithubImportJob < ApplicationJob
  # @param harvest [Harvest] the harvest instance this job belongs to.
  # @param pipeline_name [String] the name of the pipeline to use for transformation
  def perform(harvest, pipeline_name)
    pipeline = Pipeline.for(pipeline_name)
    importer.import(harvest, pipeline) do |resource|
      process_resource(resource, pipeline)
    end
  end

  private

  # Now that the resource is harvested, kick off a job to transform it to IR
  def process_resource(resource, pipeline)
    TrajectTransformJob.perform_later(resource, pipeline)
  end

  def github_token
    Settings.import.access_token
  end

  def importer
    GithubImporter.new(github_token, Settings.import.repo)
  end
end
