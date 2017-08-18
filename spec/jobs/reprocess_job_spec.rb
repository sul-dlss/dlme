# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ReprocessJob, type: :job do
  let(:harvested_resource) { create(:harvested_resource, pipeline: pipeline) }
  let(:pipeline) { Pipeline.for('stanford_mods') }

  before do
    allow(ModsTransformJob).to receive(:perform_later)
  end

  it 'processes resources' do
    described_class.perform_now(harvested_resource.harvest)
    expect(ModsTransformJob).to have_received(:perform_later).with(harvested_resource)
  end
end
