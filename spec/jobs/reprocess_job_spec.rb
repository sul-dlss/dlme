# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ReprocessJob, type: :job do
  let(:harvested_resource) { create(:harvested_resource, pipeline: pipeline) }
  let(:pipeline) { Pipeline.for('stanford_mods') }
  let(:config) { Settings.import.sources.stanford_mods }

  it 'processes resources' do
    described_class.perform_now(harvested_resource.harvest)
    expect(TrajectTransformJob).to have_been_enqueued.with(harvested_resource, pipeline)
  end
end
