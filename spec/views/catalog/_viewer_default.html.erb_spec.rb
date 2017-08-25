# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'catalog/_viewer_default.html.erb', type: :view do
  let(:document) { SolrDocument.new(source) }
  let(:source) { {} }
  let(:blacklight_config) { CatalogController.blacklight_config }

  before do
    controller.singleton_class.class_eval do
      protected

      def blacklight_config; end

      def blacklight_configuration_context
        @blacklight_configuration_context ||= Blacklight::Configuration::Context.new(self)
      end
      helper_method :blacklight_config, :blacklight_configuration_context
    end

    stub_template 'catalog/_oembed_default.html.erb' => 'oembed'
    stub_template 'catalog/_openseadragon_default.html.erb' => 'openseadragon'

    allow(controller).to receive_messages(blacklight_config: blacklight_config)
    render partial: 'catalog/viewer_default', locals: { document: document, blacklight_config: blacklight_config }
  end

  context 'for embeddable resources' do
    let(:source) { { 'agg_is_shown_at.wr_id_ssim' => ['https://purl.stanford.edu/tk780vf9050'] } }

    it 'renders oembed for embeddable resources' do
      expect(rendered).to include 'oembed'
    end
  end

  context 'for openseadragonable resources' do
    let(:source) do
      {
        'agg_is_shown_by.wr_has_service_ssim' => [{
          'service_id' => 'http://example.com/iiif/resource',
          'service_conforms_to' => 'http://iiif.io/api/image'
        }.to_json]
      }
    end

    it 'renders openseadragon for iiif-able resources' do
      expect(rendered).to include 'openseadragon'
    end
  end

  context 'for resources with thumbnails' do
    let(:source) do
      {
        'agg_is_shown_at.wr_id_ssim' => ['http://example.com/resource/'],
        'agg_preview.wr_id_ssim' => ['http://example.com/resource.jpg']
      }
    end

    it 'renders a thumbnail that links to the source' do
      expect(rendered).to have_link href: 'http://example.com/resource/'
      expect(rendered).to have_selector 'a > img[@src="http://example.com/resource.jpg"]'
    end
  end
end
