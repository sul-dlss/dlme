# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SolrDocument do
  subject(:document) { described_class.new(source) }

  let(:source) { {} }

  describe '#export_formats' do
    it 'has the ir format registered' do
      expect(document.export_formats).to include :ir
    end
  end

  describe '#intermediate_representation' do
    context 'without an IR' do
      it 'is an empty hash' do
        expect(document.intermediate_representation).to be_empty
      end
    end

    context 'with some data' do
      let(:source) { { '__raw_resource_json_ss' => { a: 1 }.to_json } }

      it 'returns the raw resource document' do
        expect(document.intermediate_representation).to include 'a' => 1
      end
    end
  end

  describe '#export_as_ir' do
    let(:source) { { '__raw_resource_json_ss' => '{}' } }

    it 'returns the raw resource document' do
      expect(document.export_as_ir).to eq '{}'
    end
  end

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

  describe '#embeddable?' do
    context 'Stanford PURLs' do
      let(:source) do
        {
          'agg_is_shown_at.wr_id_ssim' => 'https://purl.stanford.edu/tk780vf9050'
        }
      end

      it 'is true' do
        expect(document).to be_embeddable
      end
    end

    context 'non-embeddable URLs' do
      let(:source) do
        {
          'agg_is_shown_at.wr_id_ssim' => 'http://arks.princeton.edu/ark:/88435/rj4305881'
        }
      end

      it 'is true' do
        expect(document).not_to be_embeddable
      end
    end
  end

  describe '#iiifable?' do
    context 'known IIIF provider' do
      let(:source) do
        {
          'agg_is_shown_at.wr_is_referenced_by_ssi' => ['https://iiif.bodleian.ox.ac.uk/iiif/manifest/22974622-d838-4496-8835-33ecda85f21f.json']
        }
      end

      it do
        expect(document.iiifable?).to be true
      end
    end

    context 'http:// IIIF provider' do
      let(:source) do
        {
          'agg_is_shown_at.wr_is_referenced_by_ssi' => ['http://iiif.bodleian.ox.ac.uk/iiif/manifest/22974622-d838-4496-8835-33ecda85f21f.json']
        }
      end

      it do
        expect(document.iiifable?).to be false
      end
    end
  end

  describe '#iiif_manifest_url' do
    context 'known IIIF provider' do
      let(:source) do
        {
          'agg_is_shown_at.wr_is_referenced_by_ssi' => ['https://iiif.bodleian.ox.ac.uk/iiif/manifest/22974622-d838-4496-8835-33ecda85f21f.json']
        }
      end

      it 'maps id to manifest url' do
        expect(document.iiif_manifest_url).to eq 'https://iiif.bodleian.ox.ac.uk/iiif/manifest/22974622-d838-4496-8835-33ecda85f21f.json'
      end
    end

    context '' do
      let(:source) do
        {}
      end

      it 'is false' do
        expect(document.iiif_manifest_url).to be_blank
      end
    end
  end
end
