# frozen_string_literal: true

require 'github_importer'

# @abstract an abstract class for importing files from a Github directory
class GithubImportJob < ApplicationJob
  queue_as :default

  def perform
    importer.import(import_directory) do |filename, content|
      process_file(filename, content)
    end
  end

  private

  def github_token
    Settings.import.access_token
  end

  def importer
    GithubImporter.new(github_token, Settings.import.repo)
  end
end
