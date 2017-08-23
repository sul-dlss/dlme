# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TrajectTransformJob, type: :job do
  let(:indexer) { instance_double(Traject::Indexer, load_config_file: true, process: true) }
  let(:harvest) { create(:harvest) }
  let(:pipeline) { Pipeline.for('penn_tei') }
  let(:harvested_resource) { create(:harvested_resource, harvest: harvest, pipeline: pipeline) }

  before do
    allow(Traject::Indexer).to receive(:new).and_return(indexer)

    ResourceContent.create(multihash: harvested_resource.multihash, body: 'TEIXML')
  end

  it 'imports files' do
    described_class.perform_now(harvested_resource, pipeline)
    expect(indexer).to have_received(:load_config_file)
      .with((Rails.root + 'config/traject.rb').to_s)

    expect(indexer).to have_received(:load_config_file)
      .with((Rails.root + 'lib/traject/tei_config.rb').to_s)

    expect(indexer).to have_received(:process)
      .with('TEIXML')
  end
end
