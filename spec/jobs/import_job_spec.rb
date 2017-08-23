# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ImportJob, type: :job do
  let(:harvest) { create(:harvest) }

  before(:all) do
    @old_queue_adapter = ActiveJob::Base.queue_adapter
    ActiveJob::Base.queue_adapter = :test
  end

  after(:all) do
    ActiveJob::Base.queue_adapter = @old_queue_adapter
  end

  it 'triggers a harvest for all configured sources' do
    described_class.perform_now(harvest)

    expect(GithubImportJob).to have_been_enqueued.with(harvest, "penn_tei")
    expect(GithubImportJob).to have_been_enqueued.with(harvest, "stanford_mods")
    expect(GithubImportJob).to have_been_enqueued.with(harvest, "met_csv")
  end
end
