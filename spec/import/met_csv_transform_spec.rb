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

  before do
    allow(CreateResourceJob).to receive(:perform_later)
  end

  it 'does the transform' do
    indexer.process(data)
    expect(CreateResourceJob).to have_received(:perform_later).exactly(3).times
  end
end
