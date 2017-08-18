# frozen_string_literal: true

require 'github_importer'

# @abstract an abstract class for importing files from a Github directory
class GithubImportJob < ApplicationJob
  queue_as :default
  class_attribute :import_directory
  class_attribute :pipeline

  # @param harvest [Harvest] the harvest instance this job belongs to.
  def perform(harvest)
    importer.import(import_directory, harvest, pipeline) do |resource|
      process_resource(resource)
    end
  end

  private

  # Now that the resource is harvested, kick off a job to transform it to IR
  def process_resource(resource)
    pipeline.job.perform_later(resource)
  end

  def github_token
    Settings.import.access_token
  end

  def importer
    GithubImporter.new(github_token, Settings.import.repo)
  end
end
