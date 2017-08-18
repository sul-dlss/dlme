# frozen_string_literal: true

FactoryGirl.define do
  factory :resource_content do
    multihash 'MyString'
    body 'MyText'
  end
end
