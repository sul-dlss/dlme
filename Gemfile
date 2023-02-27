# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 7.2.2'

gem 'propshaft'

# Use Puma as the app server
gem 'puma', '~> 7.0'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.7'
# Use Redis adapter for caching in production
gem 'redis', '~> 5.0'

# Use Active Storage variant
# gem 'image_processing', '~> 1.2'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.4', require: false

group :development, :test do
  # Use sqlite3 as the database for Active Record
  gem 'sqlite3', '~> 2.5'

  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem 'debug'

  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '~> 3.0'
  gem 'rspec_junit_formatter'
  gem 'rspec-rails'
  gem 'selenium-webdriver'
  gem 'simplecov', '~> 0.21'

  gem 'factory_bot_rails', '~> 6.0'
  gem 'rails-controller-testing'
  gem 'rubocop', '~> 1.0'
  gem 'rubocop-capybara'
  gem 'rubocop-factory_bot'
  gem 'rubocop-performance'
  gem 'rubocop-rails'
  gem 'rubocop-rspec'
  gem 'rubocop-rspec_rails'
  gem 'solr_wrapper'
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 4.1.0'
  # Display performance information such as SQL time and flame graphs for each request in your browser.
  # Can be configured to work on production as well see: https://github.com/MiniProfiler/rack-mini-profiler/blob/master/README.md
  gem 'rack-mini-profiler', '~> 4.0'
end

group :production do
  gem 'pg'
  gem 'sidekiq', '~> 8.0'
end

group :deployment do
  gem 'capistrano-passenger'
  gem 'capistrano-rails'
  gem 'dlss-capistrano'
end

gem 'blacklight', '~> 8.2'
gem 'blacklight-spotlight', '~> 4.0'

gem 'bootstrap_form', '~> 4.5' # needs to match Bootstrap version

gem 'friendly_id'
gem 'riiif', '~> 2.0'
gem 'sitemap_generator'

gem 'blacklight-gallery', '~> 4.2'
gem 'blacklight-hierarchy', '~> 6.1'
gem 'blacklight-oembed', '>= 0.1.0'
gem 'blacklight_range_limit', '~> 8.0'
gem 'rails_autolink'
gem 'rsolr', '>= 1.0'

gem 'config'
gem 'devise'
gem 'devise-guests', '~> 0.6'
gem 'dry-validation'

gem 'bot_challenge_page', '~> 0.4.0'
gem 'honeybadger'
gem 'http'
gem 'lograge'
gem 'okcomputer'
gem 'slowpoke', '~> 0.4'

gem 'font-awesome-rails'

gem 'shakapacker', '~> 6.4'

gem 'cache_with_locale'

gem 'i18n-tasks'

gem 'turbo-rails', '~> 1.3'

gem 'importmap-rails', '~> 2.0'

gem 'cssbundling-rails', '~> 1.1'
gem 'stimulus-rails', '~> 1.2'

gem 'recaptcha', '~> 5.16'

gem 'connection_pool', '~> 2.5' # pinned until fix for https://github.com/rails/rails/issues/56291 is released
