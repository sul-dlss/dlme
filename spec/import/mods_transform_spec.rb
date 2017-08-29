# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Transforming MODS files' do
  let(:data) { File.open(fixture_file_path) }
  let(:exhibit) { create(:exhibit) }
  let(:slug) { exhibit.slug }

  before do
    indexer.settings['exhibit_slug'] = slug
    allow(CreateResourceJob).to receive(:perform_later)
  end

  describe 'Transform Princeton MODS file' do
    let(:indexer) { Pipeline.for('princeton_mods').indexer(HarvestedResource.new(original_filename: fixture_file_path)) }

    let(:identifier) { 'movie-posters/records/princeton/eg1_0019.mods' }
    let(:fixture_file_path) { File.join(fixture_path, 'mods/eg1_0019.mods') }

    it 'does the transform' do
      indexer.process(data)
      expect(CreateResourceJob).to have_received(:perform_later) do |_id, _two, json|
        dlme = JSON.parse(json)

        expect(dlme['id']).to eq 'princeton_eg1-0019'
        expect(dlme['cho_identifier']).to eq ['eg1-0019', 'http://diglib.princeton.edu/mdata/pudl0100/posters/eg1_0019.mods']
        expect(dlme['cho_language']).to eq ['ara']
        expect(dlme['cho_coverage']).to eq ['Egypt']
        expect(dlme['cho_contributor'].length).to eq 3
        expect(dlme['cho_date']).to eq ['1990']
        expect(dlme['cho_dc_rights']).to match_array [
          'http://www.princeton.edu/~rbsc/research/rights.html',
          'http://www.princeton.edu/~rbsc/research/rules.html'
        ]
        expect(dlme['cho_edm_type']).to eq ['image']
        expect(dlme['cho_extent']). to eq ['1 piece.']
        expect(dlme['cho_has_type']).to eq ['Posters']
        expect(dlme['cho_is_part_of']).to eq ['http://pudl.princeton.edu/collections/pudl0100']
        expect(dlme['cho_type']).to eq ['still image']
        expect(dlme['agg_data_provider']).to eq 'Princeton University Library'
        expect(dlme['agg_provider']).to eq 'Princeton University Library'
        expect(dlme['agg_is_shown_at']).to be_nil
      end
    end
  end
end
