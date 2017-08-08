# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SolrDocument do
  subject(:document) { described_class.new(source) }

  let(:source) { {} }

  describe '#to_openseadragon' do
    context 'for a document with IIIF service' do
      let(:source) do
        {
          'agg_is_shown_by.wr_has_service_ssim' => [{
            service_id: 'https://libimages.princeton.edu/loris%2Fpudl0100%2Fposters%2Feg1_0095%2F00000001.jp2',
            service_conforms_to: 'http://iiif.io/api/image',
            service_implements: 'http://iiif.io/api/image/2/level2.json'
          }.to_json]
        }
      end

      it 'extracts IIIF service information from the aggregation' do
        expect(document.to_openseadragon).to eq 'https://libimages.princeton.edu/loris%2Fpudl0100%2Fposters%2Feg1_0095%2F00000001.jp2/info.json'
      end
    end

    context 'for a document without any aggregation' do
      it 'does nothing' do
        expect(document.to_openseadragon).to be_nil
      end
    end
  end
end
