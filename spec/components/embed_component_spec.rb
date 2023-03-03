# frozen_string_literal: true

require 'rails_helper'

RSpec.describe EmbedComponent, type: :component do
  let(:document) { SolrDocument.new(source) }
  let(:presenter) { instance_double(Blacklight::IndexPresenter, thumbnail: thumbnail) }
  let(:thumbnail) { instance_double(Blacklight::ThumbnailPresenter, exists?: true, render: 'thumbnail') }

  let(:component) { described_class.new(document: document, presenter: presenter) }
  let(:rendered) { render_inline(component) }

  context 'with an embeddable resource' do
    let(:source) { { 'agg_is_shown_at.wr_id_ssim' => ['https://purl.stanford.edu/tk780vf9050'] } }

    it 'renders oembed for embeddable resources' do
      expect(rendered).to have_selector '.oembed-widget'
    end
  end

  context 'with an openseadragonable resource' do
    let(:source) do
      {
        'agg_is_shown_at.wr_id_ssim' => ['http://example.com/resource/'],
        'agg_is_shown_by.wr_has_service_ssim' => [{
          'service_id' => 'http://example.com/iiif/resource',
          'service_conforms_to' => 'http://iiif.io/api/image'
        }.to_json]
      }
    end

    it 'renders openseadragon for iiif-able resources' do
      expect(rendered).to have_selector 'picture.osd-image'
    end
  end

  context 'with a resource with thumbnails' do
    let(:source) do
      {
        'agg_is_shown_at.wr_id_ssim' => ['http://example.com/resource/'],
        'agg_preview.wr_id_ssim' => ['http://example.com/resource.jpg']
      }
    end

    it 'renders a thumbnail that links to the source' do
      expect(rendered).to have_link href: 'http://example.com/resource/'
      expect(rendered).to have_selector 'a figure figcaption', text: 'View on contributor website'
    end
  end
end
