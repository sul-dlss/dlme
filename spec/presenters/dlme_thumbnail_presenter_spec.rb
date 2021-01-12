# frozen_string_literal: true

require 'rails_helper'

RSpec.describe DlmeThumbnailPresenter do
  let(:config) do
    Blacklight::OpenStructWithHashAccess.new(thumbnail_field: :xyz)
  end
  let(:document) { SolrDocument.new('xyz' => 'https://www.example.com/image.png') }
  let(:view_context) do
    instance_double('ActionView::ViewContext', form_authenticity_token: 'yolo')
  end
  let(:presenter) { described_class.new(document, view_context, config) }

  describe '#thumbnail_tag' do
    it 'merges in lazy attribute' do
      # rubocop:disable RSpec/MessageSpies
      expect(view_context).to receive(:image_tag).with('https://www.example.com/image.png', { loading: 'lazy' })
      # rubocop:enable RSpec/MessageSpies
      presenter.thumbnail_tag
    end
  end

  describe '#thumbnail_value_from_document' do
    context 'when not http://' do
      it 'returns super value' do
        expect(presenter.send(:thumbnail_value_from_document)).to eq 'https://www.example.com/image.png'
      end
    end

    context 'when http://' do
      let(:document) { SolrDocument.new('xyz' => 'http://www.example.com/image.png') }

      it 'returns proxy value' do
        # rubocop:disable RSpec/MessageSpies
        expect(view_context).to receive(:image_proxy_path)
          .with(url: 'http://www.example.com/image.png', token: 'yolo')
          .and_return('/image_proxy')
        # rubocop:enable RSpec/MessageSpies
        expect(presenter.send(:thumbnail_value_from_document)).to eq '/image_proxy'
      end
    end
  end
end
