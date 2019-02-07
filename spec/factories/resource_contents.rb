# frozen_string_literal: true

FactoryBot.define do
  factory :resource_content do
    multihash 'MyString'
    body 'MyText'
  end
end
