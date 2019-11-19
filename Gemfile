# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

gem 'rails', '~> 5.2.2'

# Use Puma as the app server
gem 'puma', '~> 3.7'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false

group :development, :test do
  # Use sqlite3 as the database for Active Record
  gem 'sqlite3', '~> 1.4'

  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '~> 3.0'
  gem 'rspec-rails'
  gem 'rspec_junit_formatter'
  gem 'selenium-webdriver'
  gem 'simplecov'

  gem 'factory_bot_rails', '~> 5.0'
  gem 'rails-controller-testing'
  gem 'rubocop', '~> 0.65'
  gem 'rubocop-performance'
  gem 'rubocop-rails'
  gem 'rubocop-rspec'
  gem 'solr_wrapper'
  gem 'webdrivers'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'web-console', '>= 3.3.0'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :production do
  gem 'carrierwave-aws'
  gem 'pg'
  gem 'sidekiq'
end

gem 'aws-sdk-sns'

gem 'blacklight-spotlight', github: 'projectblacklight/spotlight'
gem 'twitter-typeahead-rails', '0.11.1.pre.corejavascript'

gem 'friendly_id'
gem 'iiif-presentation', '~> 0.2.0'
gem 'riiif', '~> 2.0'
gem 'sitemap_generator'

gem 'blacklight-gallery', '>= 0.3.0'
gem 'blacklight-hierarchy', github: 'sul-dlss/blacklight-hierarchy'
gem 'blacklight-oembed', '>= 0.1.0'
gem 'jquery-rails'
gem 'rails_autolink'
gem 'rsolr', '>= 1.0'

gem 'config'
gem 'devise'
gem 'devise-guests', '~> 0.6'
gem 'dry-validation'

gem 'honeybadger'
gem 'lograge'
gem 'okcomputer'
gem 'rack-attack'
gem 'slowpoke', '~> 0.3.0'

gem 'bootstrap', '~> 4.0'
gem 'font-awesome-rails'
