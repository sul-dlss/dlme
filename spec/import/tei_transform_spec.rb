# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Transforming TEI files' do
  let(:indexer) do
    Traject::Indexer.new('command_line.filename' => fixture_file_path,
                         'exhibit_slug' => slug,
                         'inst_id' => 'penn').tap do |i|
      i.load_config_file('lib/traject/tei_config.rb')
    end
  end
  let(:fixture_file_path) { File.join(fixture_path, 'tei/penn_ljs394.xml') }
  let(:data) { File.open(fixture_file_path).read }
  let(:exhibit) { create(:exhibit) }
  let(:slug) { exhibit.slug }

  before do
    allow(CreateResourceJob).to receive(:perform_later)
  end

  it 'does the transform' do
    indexer.process(data)
    expect(CreateResourceJob).to have_received(:perform_later) do |_id, _two, json|
      dlme = JSON.parse(json)
      expect(dlme['id']).to eq 'penn_ljs394'
      expect(dlme['agg_provider']).to eq 'University of Pennsylvania Library'
      expect(dlme['agg_data_provider']).to eq 'University of Pennsylvania Library'
      expect(dlme['cho_title']).to eq ['Section of Tāj al-lughah wa-ṣiḥāḥ al-ʻArabīyah']
      # expect(dlme['cho_alternative']).to eq ['???']
      expect(dlme['cho_description'].first).to start_with 'Volume from a 14th-century copy'
      expect(dlme['cho_date']).to eq ['13--']
      expect(dlme['cho_dc_rights'].first).to start_with 'This description is'
      expect(dlme['cho_dc_rights'].second).to match(/^All\s+referenced images/)

      expect(dlme['cho_creator']).to eq ['Jawharī, Ismāʻīl ibn Ḥammād, d. 1003?']
      # expect(dlme['cho_contributor']).to eq ['???']

      # TODO: where is cho_edm_type found?
    end
  end
end
