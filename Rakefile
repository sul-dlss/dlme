# frozen_string_literal: true

# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative 'config/application'

Rails.application.load_tasks

begin
  require 'rubocop/rake_task'
  RuboCop::RakeTask.new
rescue LoadError
  task :rubocop do
    raise 'Unable to load rubocop'
  end
end

# remove default rspec task
task(:default).clear

task default: :ci

task ci: [:rubocop] do
  ENV['environment'] = 'test'

  SolrWrapper.wrap(port: '8983') do |solr|
    solr.with_collection(name: 'dlme',
                         dir: File.join(__dir__, 'solr', 'config')) do
      # run the tests
      Rake::Task['spec'].invoke
    end
  end
end
require 'solr_wrapper/rake_task' unless Rails.env.production?
