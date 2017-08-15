# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PennImportJob, type: :job do
  let(:importer) { double }
  let(:indexer) { instance_double(Traject::Indexer, load_config_file: true, process: true) }

  before do
    allow(GithubImporter).to receive(:new).and_return(importer)
    allow(Traject::Indexer).to receive(:new).and_return(indexer)
    allow(importer).to receive(:import).and_yield('foo', 'bar')
  end

  it 'imports files' do
    described_class.perform_now('TOKEN')

    expect(GithubImporter).to have_received(:new)
      .with('TOKEN', 'waynegraham/dlme-metadata')

    expect(importer).to have_received(:import)
      .with('manuscript/records/penn/schoenberg')

    expect(indexer).to have_received(:load_config_file)
      .with('lib/traject/tei_config.rb')

    expect(indexer).to have_received(:process)
      .with('bar')
  end
end
