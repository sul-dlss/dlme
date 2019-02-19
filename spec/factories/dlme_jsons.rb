# frozen_string_literal: true

FactoryBot.define do
  factory :dlme_json, class: DlmeJson do
    data do
      { json: '{"id":"test_id", "agg_provider":"factorybot", ' \
               '"agg_data_provider":"factorybot", "cho_title":["test object"]}' }
    end
    exhibit
  end
end
