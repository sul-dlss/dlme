# frozen_string_literal: true

require 'rails_helper'

RSpec.describe HarvestedResource, type: :model do
  describe '#identifier' do
    subject { resource.identifier }

    let(:resource) { described_class.new(original_filename: original_filename) }

    context 'for a penn file' do
      let(:original_filename) { 'manuscript/records/penn/schoenberg/ljs189.xml' }

      it { is_expected.to eq 'penn_ljs189' }
    end

    context 'for a stanford file' do
      let(:original_filename) { 'maps/records/stanford/bg149mk9437.mods' }

      it { is_expected.to eq 'stanford_bg149mk9437' }
    end
  end

  describe '#content' do
    subject { harvested_resource.content }

    before do
      create(:resource_content, multihash: multihash, body: 'this is a unique thing')
    end

    let(:harvested_resource) { create(:harvested_resource, multihash: multihash) }
    let(:multihash) { '11111122233999' }

    it { is_expected.to eq 'this is a unique thing' }
  end
end
