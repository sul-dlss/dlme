# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Transforming Nuministics CSV file' do
  let(:indexer) do
    Traject::Indexer.new('command_line.filename' => fixture_file_path,
                         'exhibit_slug' => slug,
                         'agg_provider' => 'American Numismatics Society',
                         'inst_id' => 'ans').tap do |i|
      i.load_config_file('lib/traject/numismatic_csv_config.rb')
    end
  end
  let(:fixture_file_path) { File.join(fixture_path, 'csv/numismatic_islam_department.csv') }
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
      expect(dlme['agg_provider']).to eq 'American Numismatics Society'

      # MET Museum
      expect(dlme['id']).to eq 'ans_1975-93-862'

      expect(dlme['cho_contributor']).to include 'Zaffar b. Shabba'
      expect(dlme['cho_contributor']).to include 'al-Qasim b. `Ubayd Allah'
      expect(dlme['cho_description']).to include '3 wuqiyya'
      expect(dlme['agg_data_provider']).to eq 'Islamic'
      expect(dlme['cho_extent']).to eq nil
      expect(dlme['cho_temporal']).to eq ['Umayyad glass']
      expect(dlme['cho_coverage']).to eq nil
      expect(dlme['cho_medium']).to eq ['Glass']
      expect(dlme['cho_creator']).to eq nil
      expect(dlme['cho_format']).to eq ['Weight']
      expect(dlme['cho_description']).to include '...sim b. ...Allah / Zaffar b....'
      expect(dlme['cho_identifier']).to include '1975.93.862'
      expect(dlme['cho_source']).to eq ['Morton.89']
      expect(dlme['cho_spatial']).to eq ['NE Africa']
      expect(dlme['cho_title']).to eq ['Glass 3 wuqiyya of Zaffar b. Shabba, NE Africa, 739 - 740. 1975.93.862']
      expect(dlme['cho_identifier']).to include 'http://numismatics.org/search/id/1975.93.862'
      expect(dlme['cho_date']).to eq ['739-740']
      expect(dlme['agg_is_shown_at']).to include('wr_id' => 'http://numismatics.org/search/id/1975.93.862')
    end
  end
end
