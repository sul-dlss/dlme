# frozen_string_literal: true

FactoryBot.define do
  factory :transform_result do
    sequence(:url) { |n| "http://example.com/#{n}" }
    data_path { '/foo' }
    success { true }
    records { 10 }
    duration { 100 }
    timestamp { DateTime.now }
  end
end
