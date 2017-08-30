# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Transforming MET CSV files' do
  let(:indexer) { Pipeline.for('met_csv').indexer(HarvestedResource.new(original_filename: fixture_file_path)) }
  let(:fixture_file_path) { File.join(fixture_path, 'csv/met.csv') }
  let(:data) do
    # Read the first 4 lines (1 for headers and 3 for the first record)
    StringIO.new(File.open(fixture_file_path) { |f| f.readline + f.readline + f.readline + f.readline })
  end
  let(:exhibit) { create(:exhibit) }
  let(:slug) { exhibit.slug }

  let(:provide) do
    { 'exhibit_slug' => slug,
      'writer_class_name' => 'Traject::JsonWriter',
      'agg_provider' => 'Metropolitan Museum of Art' }
  end
  let(:writer) { instance_double Traject::JsonWriter, put: '' }

  before do
    indexer.settings.merge! provide
    allow(Traject::JsonWriter).to receive(:new).and_return(writer)
  end

  it 'does the transform' do
    indexer.process(data)
    expect(writer).to have_received(:put) do |context|
      dlme = context.output_hash
      expect(dlme['agg_preview'])
        .to eq [{ 'wr_id' => ['http://images.metmuseum.org/CRDImages/an/web-large/ss74_51_4366gp.JPG'] }]
    end
  end
end
