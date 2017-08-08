# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Transforming mods files' do
  let(:indexer) do
    Traject::Indexer.new('identifier' => identifier, 'exhibit_slug' => slug).tap do |i|
      i.load_config_file('lib/traject/mods_config.rb')
    end
  end
  let(:identifier) { 'stanford_tk780vf9050' }
  let(:fixture_file_path) { File.join(fixture_path, 'mods/stanford.mods') }
  let(:mods) { File.open(fixture_file_path).read }
  let(:exhibit) { create(:exhibit) }
  let(:slug) { exhibit.slug }

  it 'does the transform' do
    expect { indexer.process(mods) }.to change { DlmeJson.count }.by(1)
    dlme = DlmeJson.last.json
    expect(dlme['id']).to eq ['stanford_tk780vf9050']
    expect(dlme['cho_title']).to eq ['Walters Ms. W.586, Work on the duties of Muslims toward the ' \
                                     'Prophet Muhammad with an account of his life']
    expect(dlme['cho_alternative']).to eq ['al-Shifāʾ fī taʿrīf ḥuqūq al-Muṣṭafá',
                                           'الشفاء في تعريف حقوق المصطفى']
    expect(dlme['cho_description'].first).to start_with 'This manuscript is an illuminated copy'
  end
end
