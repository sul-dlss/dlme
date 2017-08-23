# frozen_string_literal: true

require 'rails_helper'

RSpec.describe GithubImportJob, type: :job do
  let(:importer) { double }
  let(:harvest) { create(:harvest) }
  let(:harvested_resource) { create(:harvested_resource, harvest: harvest, pipeline: pipeline) }

  let(:pipeline_name) { 'stanford_mods' }
  let(:pipeline) { Pipeline.for(pipeline_name) }

  before do
    allow(Settings.import).to receive(:access_token).and_return('TOKEN')
    allow(GithubImporter).to receive(:new).and_return(importer)
    allow(importer).to receive(:import).and_yield(harvested_resource)
  end

  it 'imports files' do
    described_class.perform_now(harvest, pipeline_name)

    expect(GithubImporter).to have_received(:new)
      .with('TOKEN', 'waynegraham/dlme-metadata')

    expect(importer).to have_received(:import)
      .with(harvest, pipeline)

    expect(TrajectTransformJob).to have_been_enqueued.with(harvested_resource, pipeline)
  end
end
