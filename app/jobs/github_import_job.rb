# frozen_string_literal: true

require 'github_importer'

# @abstract an abstract class for importing files from a Github directory
class GithubImportJob < ApplicationJob
  queue_as :default

  def perform(github_token)
    importer(github_token).import(import_directory) do |filename, content|
      process_file(filename, content)
    end
  end

  private

  def importer(github_token)
    GithubImporter.new(github_token, Settings.import.repo)
  end
end

# Patch the logger to prevent the github access_token from being logged
module SilentArgsLogger
  private

  def args_info(job)
    return super unless job.class < GithubImportJob
    args_excluding_first(job)
  end

  def args_excluding_first(job)
    ' with arguments: ***REDACTED*** ' +
      job.arguments[1..-1].map { |arg| format(arg).inspect }.join(', ')
  end
end

ActiveJob::Logging::LogSubscriber.prepend SilentArgsLogger
