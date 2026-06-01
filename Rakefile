# frozen_string_literal: true

# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative 'config/application'

Rails.application.load_tasks

begin
  require 'rubocop/rake_task'
  RuboCop::RakeTask.new
rescue LoadError
  task rubocop: [:environment] do
    raise 'Unable to load rubocop'
  end
end

def system_with_error_handling(*args)
  Open3.popen3(*args) do |_stdin, stdout, stderr, thread|
    puts stdout.read
    raise "Unable to run #{args.inspect}: #{stderr.read}" unless thread.value.success?
  end
end

def with_solr(&) # rubocop:disable Metrics/MethodLength
  # We're being invoked by the app entrypoint script and solr is already up via docker compose
  if ENV['SOLR_ENV'] == 'docker-compose'
    yield
  elsif system('docker compose version')
    # We're not running `docker compose up' but still want to use a docker instance of solr.
    begin
      puts 'Starting Solr'
      system_with_error_handling 'docker compose up -d solr'
      yield
    ensure
      puts 'Stopping Solr'
      system_with_error_handling 'docker compose stop solr'
    end
  else
    SolrWrapper.wrap do |solr|
      solr.with_collection(&)
    end
  end
end

# remove default rspec task
task(:default).clear

task default: :ci

task ci: [:rubocop, 'assets:precompile'] do
  ENV['environment'] = 'test'

  with_solr do
    # run the tests
    Rake::Task['spec'].invoke
  end
end
