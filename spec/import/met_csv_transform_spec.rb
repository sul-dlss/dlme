# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Transforming MET CSV files' do
  let(:indexer) do
    Traject::Indexer.new('exhibit_slug' => slug).tap do |i|
      i.load_config_file('lib/traject/met_csv_config.rb')
    end
  end
  let(:fixture_file_path) { File.join(fixture_path, 'csv/met.csv') }
  let(:data) { File.open(fixture_file_path).read }
  let(:exhibit) { create(:exhibit) }
  let(:slug) { exhibit.slug }

  it 'does the transform' do
    expect { indexer.process(data) }.to change { DlmeJson.count }.by(3)
    dlme = DlmeJson.last.json
    expect(dlme['id']).to eq '321383'
    expect(dlme['cho_title']).to eq ['Stamp seal']
    expect(dlme['cho_creator']).to eq ['Demo Display Name, Demo Suffix, 1900 - 2000 (Demo Role ; Demo Artist Bio)']
    expect(dlme['cho_format']).to eq ['Stamp seal']
    expect(dlme['cho_spatial']).to eq ['Mesopotamia']
    expect(dlme['cho_has_type']).to eq ['Faience-Stamp Seals']
    expect(dlme['cho_provenance']).to eq ['The Cesnola Collection, Purchased by subscription, 1874�76']
    expect(dlme['cho_coverage']).to eq []
    expect(dlme['agg_provider']).to eq 'Metropolitan Museum of Art'
    expect(dlme['agg_data_provider']).to eq 'Ancient Near Eastern Art, Metropolitan Museum of Art, New York, NY'
    expect(dlme['cho_extent']).to eq ['0.47 x 0.79 in. (1.19 x 2.01 cm)']
    expect(dlme['cho_dc_rights']).to eq ['Public Domain']
    expect(dlme['agg_is_shown_at']).to include('wr_id' => 'http://www.metmuseum.org/art/collection/search/321383')
    expect(dlme['cho_medium']).to eq ['Faience']
    expect(dlme['cho_date']).to eq ['-900 - -600', 'ca. early 1st millennium B.C.']
    expect(dlme['cho_identifier']).to eq ['321383']
    expect(dlme['cho_format']).to eq ['Stamp seal']
    expect(dlme['cho_source']).to eq ['74.51.4368']
    expect(dlme['cho_temporal']).to eq []
    expect(dlme['cho_edm_type']).to eq ['3D']
    expect(dlme['cho_type']).to eq ['three dimensional object']
  end
end
