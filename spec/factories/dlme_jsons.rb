# frozen_string_literal: true

FactoryBot.define do
  sequence(:json_data_id)
  factory :dlme_json, class: 'DlmeJson' do
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
