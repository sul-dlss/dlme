# frozen_string_literal: true

require 'rails_helper'

RSpec.describe MetCsvTransformJob, type: :job do
  let(:indexer) { instance_double(Traject::Indexer, load_config_file: true, process: true) }
  let(:harvested_resource) { instance_double(HarvestedResource, content: 'METCSV') }

  before do
    allow(Traject::Indexer).to receive(:new).and_return(indexer)
  end

  it 'imports files' do
    described_class.perform_now(harvested_resource)

    expect(indexer).to have_received(:load_config_file)
      .with(Rails.root + 'lib/traject/met_csv_config.rb')

    expect(indexer).to have_received(:process)
      .with('METCSV')
  end
end
