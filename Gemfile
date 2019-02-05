# frozen_string_literal: true

source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.1.2'
# Use sqlite3 as the database for Active Record
gem 'sqlite3'
# Use Puma as the app server
gem 'puma', '~> 3.7'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

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

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '~> 2.13'
  gem 'coveralls', require: false
  gem 'rspec-rails'
  gem 'selenium-webdriver'

  gem 'factory_girl_rails'
  gem 'rails-controller-testing'
  gem 'rubocop', '~> 0.57.1'
  gem 'rubocop-rspec'
  gem 'solr_wrapper', '>= 0.3'
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

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

gem 'blacklight-spotlight', '~> 1.0.0.alpha2'

gem 'friendly_id'
gem 'riiif', '~> 1.0'
gem 'sitemap_generator'

gem 'blacklight-gallery', '>= 0.3.0'
gem 'blacklight-oembed', '>= 0.1.0'
gem 'devise_invitable'
gem 'devise_token_auth'
gem 'jquery-rails'
gem 'rails_autolink'
gem 'rsolr', '>= 1.0'

gem 'config'
gem 'devise'
gem 'devise-guests', '~> 0.6'
gem 'dry-validation'
gem 'faraday'
gem 'faraday-http-cache'
gem 'octokit', '~> 4.0'

gem 'honeybadger'
gem 'lograge'
gem 'multihashes'
gem 'okcomputer'
gem 'rack-attack'
gem 'secure_headers', '~> 3.7'
gem 'slowpoke'

gem 'jsonpath'
gem 'traject'

gem 'font-awesome-rails'
