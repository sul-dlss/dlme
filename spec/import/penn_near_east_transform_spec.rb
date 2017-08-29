# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Transforming Penn Egyptian Museum CSV file' do
  let(:indexer) { Pipeline.for('penn_near_east').indexer(HarvestedResource.new(original_filename: fixture_file_path)) }
  let(:fixture_file_path) { File.join(fixture_path, 'csv/penn_near_east.csv') }
  let(:data) { File.open(fixture_file_path).read }
  let(:exhibit) { create(:exhibit) }
  let(:slug) { exhibit.slug }

  before do
    indexer.settings['exhibit_slug'] = slug
    allow(CreateResourceJob).to receive(:perform_later)
  end

  it 'does the transform' do
    indexer.process(data)
    expect(CreateResourceJob).to have_received(:perform_later) do |_id, _two, json|
      dlme = JSON.parse(json)
      expect(dlme['agg_provider']).to eq 'Penn Museum'
      expect(dlme['id']).to eq 'penn_museum_110701'
      expect(dlme['cho_description']).to include 'Broken in two.'
      expect(dlme['cho_description']).to include 'Larger piece has overlap design.'
      expect(dlme['agg_data_provider']).to eq 'Near Eastern Section, Penn Museum'
      expect(dlme['cho_date']).to eq nil
      expect(dlme['cho_identifier']).to eq ['110701', '?']
      expect(dlme['cho_subject']).to eq nil
      expect(dlme['cho_medium']).to eq ['Bronze']
      expect(dlme['cho_extent']).to eq nil
      expect(dlme['cho_title']).to eq ['Ring']
      expect(dlme['cho_source']).to include '61-14-2243'
      expect(dlme['cho_temporal']).to eq nil
      expect(dlme['cho_spatial']).to eq ['Israel', 'Beth Shemesh']
      expect(dlme['agg_is_shown_at']).to include('wr_id' => 'http://www.penn.museum/collections/object/110701')
      expect(dlme['agg_is_shown_by']).to include('wr_id' => 'https://www.penn.museum/collections/object_images.php?irn={110701}')
    end
  end
end
