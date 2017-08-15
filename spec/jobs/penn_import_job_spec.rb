# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PennImportJob, type: :job do
  let(:importer) { double }

  before do
    allow(GithubImporter).to receive(:new).and_return(importer)
    allow(importer).to receive(:import).and_yield('foo.xml', 'bar')
    allow(TeiTransformJob).to receive(:perform_later)
  end

  it 'imports files' do
    described_class.perform_now('TOKEN')

    expect(GithubImporter).to have_received(:new)
      .with('TOKEN', 'waynegraham/dlme-metadata')

    expect(importer).to have_received(:import)
      .with('manuscript/records/penn/schoenberg')

    expect(TeiTransformJob).to have_received(:perform_later)
      .with('penn_foo', 'bar')
  end
end
