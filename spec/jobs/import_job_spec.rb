# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ImportJob, type: :job do
  let(:harvest) { create(:harvest) }

  it 'triggers a harvest for all configured sources' do
    described_class.perform_now(harvest)

    expect(GithubImportJob).to have_been_enqueued.with(harvest, 'penn_tei')
    expect(GithubImportJob).to have_been_enqueued.with(harvest, 'stanford_mods')
    expect(GithubImportJob).to have_been_enqueued.with(harvest, 'met_csv')
  end
end
