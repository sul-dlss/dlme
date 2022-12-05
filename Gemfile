# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 7.0'

# The original asset pipeline for Rails [https://github.com/rails/sprockets-rails]
gem 'sprockets-rails'

# Use Puma as the app server
gem 'puma', '~> 5.0'
# Use SCSS for stylesheets
gem 'sassc-rails'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
# gem 'webpacker', '~> 5.0'
# Use Terser as compressor for JavaScript assets
gem 'terser', '~> 1.1'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.7'
# Use Redis adapter to run Action Cable in production
gem 'redis', '~> 4.5.1' # 4.6.0 spews deprecation warnings out of sidekiq
# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Active Storage variant
# gem 'image_processing', '~> 1.2'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.4', require: false

group :development, :test do
  # Use sqlite3 as the database for Active Record
  gem 'sqlite3', '~> 1.4'

  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem 'debug', platforms: %i[mri mingw x64_mingw]

  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '~> 3.0'
  gem 'rspec_junit_formatter'
  gem 'rspec-rails'
  gem 'selenium-webdriver'
  gem 'simplecov', '~> 0.21'

  gem 'factory_bot_rails', '~> 6.0'
  gem 'rails-controller-testing'
  gem 'rubocop', '~> 1.0'
  gem 'rubocop-performance'
  # Don't use rubocop-rails 2.8.0 (it has a bug that fails our builds)
  gem 'rubocop-rails', '> 2.7', '!= 2.8.0'
  gem 'rubocop-rspec'
  gem 'solr_wrapper'
  gem 'webdrivers'
end

group :development do
  gem 'guard-rspec', require: false
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 4.1.0'
  # Display performance information such as SQL time and flame graphs for each request in your browser.
  # Can be configured to work on production as well see: https://github.com/MiniProfiler/rack-mini-profiler/blob/master/README.md
  gem 'rack-mini-profiler', '~> 2.0'

  gem 'listen', '~> 3.3'
end

group :production do
  gem 'carrierwave-aws'
  gem 'pg'
  # Set sidekiq to < 7 until we move DLME on premise and update redis to >= 6
  gem 'sidekiq', '< 7'
end

gem 'aws-sdk-sns'

gem 'blacklight', '~> 7.14'
gem 'blacklight-spotlight', '~> 3.1'
gem 'twitter-typeahead-rails', '0.11.1.pre.corejavascript'

gem 'friendly_id'
gem 'iiif-presentation', '~> 1.0'
gem 'riiif', '~> 2.0'
gem 'sitemap_generator'

gem 'blacklight-gallery', '~> 4.0'
gem 'blacklight-hierarchy'
gem 'blacklight-oembed', '>= 0.1.0'
gem 'blacklight_range_limit', '~> 8.0'
gem 'jquery-rails'
gem 'rails_autolink'
gem 'rsolr', '>= 1.0'

gem 'config'
gem 'devise'
gem 'devise-guests', '~> 0.6'
gem 'dry-validation'

gem 'honeybadger'
gem 'http'
gem 'lograge'
gem 'okcomputer'
gem 'rack-attack'
gem 'slowpoke', '~> 0.4'

gem 'bootstrap', '~> 4.0'
gem 'font-awesome-rails'

gem 'shakapacker', '~> 6.4'

gem 'cache_with_locale'

gem 'i18n-js', '< 4' # v4 was a complete rewrite; will take some work to update
gem 'i18n-tasks'
