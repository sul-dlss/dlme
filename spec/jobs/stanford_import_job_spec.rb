# frozen_string_literal: true

require 'rails_helper'

RSpec.describe StanfordImportJob, type: :job do
  let(:importer) { double }
  let(:harvest) { create(:harvest) }
  let(:harvested_resource) { instance_double(HarvestedResource) }

  before do
    allow(Settings.import).to receive(:access_token).and_return('TOKEN')
    allow(GithubImporter).to receive(:new).and_return(importer)
    allow(importer).to receive(:import).and_yield(harvested_resource)
    allow(ModsTransformJob).to receive(:perform_later)
  end

  it 'imports files' do
    described_class.perform_now(harvest)

    expect(GithubImporter).to have_received(:new)
      .with('TOKEN', 'waynegraham/dlme-metadata')

    expect(importer).to have_received(:import)
      .with('maps/records/stanford', harvest, Pipeline)

    expect(ModsTransformJob).to have_received(:perform_later)
      .with(harvested_resource)
  end
end
