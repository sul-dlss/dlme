# frozen_string_literal: true

FactoryBot.define do
  factory :dlme_json, class: 'DlmeJson' do
    data do
      { json: '{"id":"test_id", "agg_provider":"factorybot", ' \
               '"agg_data_provider":"factorybot", "cho_title":["test object"]}' }
    end
    exhibit
  end

  sequence(:json_data_id)
  factory :dlme_json_unique_id, class: 'DlmeJson' do
    data do
      {
        json: {
          id: "test_id_#{generate(:json_data_id)}",
          agg_provider: 'factorybot',
          agg_data_provider: 'factorybot',
          cho_title: ['test object']
        }.to_json
      }
    end
    exhibit
  end
end
