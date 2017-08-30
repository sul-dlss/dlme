# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Transforming IIIF files' do
  let(:indexer) do
    Traject::Indexer.new('identifier' => identifier,
                         'exhibit_slug' => slug,
                         'agg_provider' => 'Test case',
                         'agg_data_provider' => 'Test case').tap do |i|
      i.load_config_file('lib/traject/iiif_config.rb')
    end
  end
  let(:identifier) { 'stanford_tk780vf9050' }
  let(:fixture_file_path) { File.join(fixture_path, 'iiif/manifest.json') }
  let(:data) { File.open(fixture_file_path) }
  let(:exhibit) { create(:exhibit) }
  let(:slug) { exhibit.slug }

  before do
    allow(CreateResourceJob).to receive(:perform_later)
  end

  it 'does the transform' do
    indexer.process(data)
    expect(CreateResourceJob).to have_received(:perform_later) do |_id, _two, json|
      dlme = JSON.parse(json)
      expect(dlme['id']).to eq 'stanford_tk780vf9050'
      expect(dlme['agg_provider']).to eq 'Test case'
      expect(dlme['agg_data_provider']).to eq 'Test case'

      expect(dlme['cho_title']).to eq ['Walters Ms. W.586, Work on the duties of Muslims toward the ' \
                                       'Prophet Muhammad with an account of his life']
    end
  end
end
