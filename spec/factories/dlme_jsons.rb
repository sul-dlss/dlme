# frozen_string_literal: true

FactoryGirl.define do
  factory :dlme_json, class: DlmeJson do
    data json: '{"id":"test_id", "agg_provider":"factorygirl", ' \
               '"agg_data_provider":"factorygirl", "cho_title":["test object"]}'
    exhibit
  end
end
