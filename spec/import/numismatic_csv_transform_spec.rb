# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Transforming Nuministics CSV file' do
  let(:indexer) { Pipeline.for('numismatics').indexer(HarvestedResource.new(original_filename: fixture_file_path)) }
  let(:fixture_file_path) { File.join(fixture_path, 'csv/numismatic_islam_department.csv') }
  let(:data) { File.open(fixture_file_path) }
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
      expect(dlme['agg_provider']).to eq 'American Numismatic Society'

      # MET Museum
      expect(dlme['id']).to eq 'ans_1975-93-86'

      expect(dlme['cho_contributor']).to include 'al-Mu`izz'
      expect(dlme['cho_description']).to include '2.84'
      expect(dlme['agg_data_provider']).to eq 'Islamic Department, American Numismatic Society'
      expect(dlme['cho_extent']).to include '22.0'
      expect(dlme['cho_temporal']).to eq ['Fatimid glass']
      expect(dlme['cho_coverage']).to eq nil
      expect(dlme['cho_medium']).to eq ['Glass']
      expect(dlme['cho_creator']).to eq nil
      expect(dlme['cho_format']).to eq ['Weight']
      expect(dlme['cho_identifier']).to include '1975.93.86'
      expect(dlme['cho_source']).to eq ['B.13']
      expect(dlme['cho_spatial']).to eq ['NE Africa']
      expect(dlme['cho_title']).to eq ['Glass Weight, NE Africa, 953 - 975. 1975.93.86']
      expect(dlme['cho_identifier']).to include 'http://numismatics.org/collection/1975.93.86'
      expect(dlme['cho_date']).to eq ['953 - 975']
      expect(dlme['agg_is_shown_at']).to include('wr_id' => 'http://numismatics.org/collection/1975.93.86')
      expect(dlme['agg_is_shown_by']).to include('wr_id' => 'http://numismatics.org/collectionimages/19501999/1975/1975.93.86.obv.width175.jpg')
    end
  end
end
