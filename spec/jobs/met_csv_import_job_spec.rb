# frozen_string_literal: true

require 'rails_helper'

RSpec.describe MetCsvImportJob, type: :job do
  let(:importer) { double }

  before do
    allow(Settings.import).to receive(:access_token).and_return('TOKEN')
    allow(GithubImporter).to receive(:new).and_return(importer)
    allow(importer).to receive(:import).and_yield('foo.csv', 'bar')
    allow(MetCsvTransformJob).to receive(:perform_later)
  end

  it 'imports files' do
    described_class.perform_now

    expect(GithubImporter).to have_received(:new)
      .with('TOKEN', 'waynegraham/dlme-metadata')

    expect(importer).to have_received(:import)
      .with('museum/records')

    expect(MetCsvTransformJob).to have_received(:perform_later)
      .with('met_museum_records_foo', 'bar')
  end
end
