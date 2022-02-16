# frozen_string_literal: true

require 'capybara'
require 'capybara/dsl'
require 'open-uri'

RSpec.configure do |config|
  config.include Capybara::DSL

  Capybara.default_driver = :selenium_chrome
  Capybara.app_host = 'https://dlmenetwork.org/library'
end
