# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CatalogHelper do
  describe 'has_thumbnail?' do
    subject { helper.has_thumbnail?(document) }

    let(:document) { SolrDocument.new }

    it { is_expected.to be true }
  end

  describe 'render_thumbnail_tag' do
    before do
      allow(helper).to receive(:link_to_document)
      helper.blacklight_config = blacklight_config
    end
    subject(:draw) { helper.render_thumbnail_tag(document) }

    let(:blacklight_config) do
      Blacklight::Configuration.new(index: Blacklight::OpenStructWithHashAccess.new(thumbnail_field: :xyz))
    end
    let(:document) { SolrDocument.new }

    context 'when the document has a thumbnail field' do
      before do
        allow(document).to receive(:has?).with(:xyz).and_return(true)
        allow(document).to receive(:first).with(:xyz).and_return('http://example.com/some.jpg')
      end

      it 'renders specified thumbnail' do
        draw
        expect(helper).to have_received(:link_to_document).with(document, image_tag('http://example.com/some.jpg'), {})
      end
    end

    context 'when the document does not have a thumbnail field' do
      it 'renders default thumbnail' do
        draw
        expect(helper).to have_received(:link_to_document).with(document, /default.*\.png/, {})
      end
    end
  end
end
