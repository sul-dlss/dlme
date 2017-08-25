# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Transforming Penn Egyptian Museum CSV file' do
  let(:indexer) do
    Traject::Indexer.new('command_line.filename' => fixture_file_path,
                         'exhibit_slug' => slug,
                         'agg_provider' => 'Penn Museum',
                         'inst_id' => 'penn_museum').tap do |i|
      i.load_config_file('lib/traject/penn_egyptian_config.rb')
    end
  end
  let(:fixture_file_path) { File.join(fixture_path, 'csv/penn_egyptian.csv') }
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
      expect(dlme['agg_provider']).to eq 'Penn Museum'
      expect(dlme['id']).to eq 'penn_museum_286472'
      expect(dlme['cho_description']).to eq nil
      expect(dlme['agg_data_provider']).to eq 'Egyptian Section, Penn Museum'
      expect(dlme['cho_date']).to include '2800 - 2675 BC'
      expect(dlme['cho_date']).to include '-2801'
      expect(dlme['cho_date']).to include '-2674'
      expect(dlme['cho_identifier']).to eq ['286472']
      expect(dlme['cho_subject']).to eq nil
      expect(dlme['cho_medium']).to eq ['Copper']
      expect(dlme['cho_extent']).to include '9.5'
      expect(dlme['cho_extent']).to include 'cm'
      expect(dlme['cho_title']).to eq ['Axe Head']
      expect(dlme['cho_source']).to include 'E9577'
      expect(dlme['cho_source']).to include 'AES 2163'
      expect(dlme['cho_temporal']).to include 'Egyptian Early Dynastic'
      expect(dlme['cho_temporal']).to include 'Second Dynasty'
      expect(dlme['cho_spatial']).to include 'Egypt'
      expect(dlme['cho_spatial']).to include 'Abydos'
      expect(dlme['agg_is_shown_at']).to include('wr_id' => 'http://www.penn.museum/collections/object/286472')
      expect(dlme['agg_is_shown_by']).to include('wr_id' => 'https://www.penn.museum/collections/object_images.php?irn={286472}')
    end
  end
end
