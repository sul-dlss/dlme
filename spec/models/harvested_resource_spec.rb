# frozen_string_literal: true

require 'rails_helper'

RSpec.describe HarvestedResource, type: :model do
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
