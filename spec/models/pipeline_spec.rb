# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Pipeline, type: :model do
  describe '#indexer' do
    subject(:indexer) { described_class.for('stanford_mods').indexer(resource) }

    let(:resource) { create(:harvested_resource, original_filename: 'x.csv') }

    it 'creates a new traject indexer for a resource' do
      expect(indexer).to be_a_kind_of Traject::Indexer
    end

    it 'sets the original filename from the provided resource' do
      expect(indexer.settings['command_line.filename']).to eq 'x.csv'
    end

    it 'sets the harvest context' do
      expect(indexer.settings['harvested_resource_id']).to eq resource.id
      expect(indexer.settings['harvest_id']).to eq resource.harvest.id
    end
  end
end
