# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'catalog/_show_with_viewer.html.erb', type: :view do
  let(:document) { SolrDocument.new(source) }
  let(:source) { {} }
  let(:blacklight_config) { CatalogController.blacklight_config }

  before do
    stub_template 'catalog/_oembed_default.html.erb' => 'oembed'
    stub_template 'catalog/_openseadragon_default.html.erb' => 'openseadragon'

    without_partial_double_verification do
      allow(view).to receive_messages(
        blacklight_config: blacklight_config,
        blacklight_configuration_context: Blacklight::Configuration::Context.new(self)
      )
    end
    render partial: 'catalog/show_with_viewer', locals: { document: document, blacklight_config: blacklight_config }
  end

  context 'with an embeddable resource' do
    let(:source) { { 'agg_is_shown_at.wr_id_ssim' => ['https://purl.stanford.edu/tk780vf9050'] } }

    it 'renders oembed for embeddable resources' do
      expect(rendered).to include 'oembed'
      expect(rendered).to include 'View on contributor website'
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
      expect(rendered).to include 'openseadragon'
      expect(rendered).to include 'View on contributor website'
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
      expect(rendered).to have_selector 'a img[@src^="/image_proxy?url"]'
      expect(rendered).to have_text 'View on contributor website'
    end
  end
end
