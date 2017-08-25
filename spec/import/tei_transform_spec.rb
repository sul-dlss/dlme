# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Transforming TEI files' do
  let(:indexer) { Pipeline.for('penn_tei').indexer(HarvestedResource.new(original_filename: fixture_file_path)) }
  let(:fixture_file_path) { File.join(fixture_path, 'tei/penn_ljs394.xml') }
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
      expect(dlme['id']).to eq 'penn_ljs394'
      expect(dlme['cho_publisher']).to include 'The University of Pennsylvania Libraries'
      expect(dlme['cho_dc_rights'].first).to start_with 'This description is'
      expect(dlme['cho_dc_rights'].second).to match(/^All\s+referenced images/)
      expect(dlme['cho_provenance']).to eq ['Ownership stamps on title page canceled (f. 1r).',
                                            'Sold by Sam Fogg Ltd. (London) to Lawrence J. Schoenberg, Nov. 2000.',
                                            'Deposit by Lawrence J. Schoenberg and Barbara Brizdle, 2011.']
      expect(dlme['cho_identifier']).to include 'LJS 394'
      expect(dlme['wr_id']).to include '5440810'
      expect(dlme['agg_is_shown_at']).to include('wr_id' => 'http://hdl.library.upenn.edu/1017/d/medren/5440810')
      expect(dlme['cho_description'].first).to start_with 'Volume from a 14th-century copy'
      expect(dlme['cho_language']).to include 'Arabic'
      expect(dlme['cho_title'].first).to start_with 'Section of'
      expect(dlme['cho_creator'].first).to start_with 'Jawhar'
      expect(dlme['cho_spatial']).to include 'Egypt or Syria'
      expect(dlme['cho_spatial']).to include 'Written in Egypt or Syria in the 14th century.'
      expect(dlme['cho_date']).to include '13--'
      expect(dlme['cho_extent']).to include 'Written in 27 long lines.'
      expect(dlme['cho_extent']).to include '203 leaves : 269 x 172 (198 x 125) mm. bound to 269 x 180 mm'
      expect(dlme['cho_subject']).to include 'Codices'
      expect(dlme['cho_subject']).to include 'Dictionaries'
      expect(dlme['cho_subject']).to include 'Illuminations (visual works)'
      expect(dlme['cho_subject']).to include 'Manuscripts, Arabic--14th century'
      expect(dlme['cho_subject']).to include 'Manuscripts, Medieval'
      expect(dlme['cho_subject']).to include 'Arabic language--Dictionaries'
      expect(dlme['cho_subject']).to include 'Traditional medicine--Formulae, receipts, prescriptions'
      expect(dlme['agg_provider']).to eq 'University of Pennsylvania Library'
      expect(dlme['agg_data_provider']).to eq 'Rare Book & Manuscript Library, University of Pennsylvania'
    end
  end
end
