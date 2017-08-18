# frozen_string_literal: true

FactoryGirl.define do
  factory :harvested_resource do
    url 'MyString'
    original_filename 'foo.mods'
    multihash '1108deadbeef'
    harvest
    pipeline
  end
end
