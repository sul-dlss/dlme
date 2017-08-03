# frozen_string_literal: true

FactoryGirl.define do
  factory :source_file do
    data 'MyText'
    label 'MODS with a IIIF Manifest'
    format 'mods'
    origin_url 'https://purl.stanford.edu/tk780vf9050.mods'
  end
end
