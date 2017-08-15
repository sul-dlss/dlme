# frozen_string_literal: true

FactoryGirl.define do
  factory :dlme_json, class: DlmeJson do
    data json: '{"id":"foo9999"}'
    exhibit
  end
end
