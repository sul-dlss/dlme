# frozen_string_literal: true

require 'rails_helper'

RSpec.describe StatisticsDashboard do
  subject(:dashboard) do
    described_class.new(
      search_service: instance_double(
        'SearchService',
        search_results: [stub_response]
      )
    )
  end

  let(:stub_response) do
    { 'response' => { 'numFound' => 100 } }
  end

  it 'has items' do
    expect(dashboard.items).to be_a StatisticsDashboard::Items
  end

  describe 'Items' do
    let(:items) { dashboard.items }

    it 'has the total from the response' do
      expect(items.total).to be 100
    end

    describe '#by_language' do
      let(:stub_response) do
        { 'facet_counts' => { 'facet_fields' => {
          'cho_language.en_ssim' => ['Value 1', '500', 'Value 2', '300']
        } } }
      end

      it 'is transforms the facet array into an array of value/count hashes' do
        expect(items.by_language.length).to eq 2
        expect(items.by_language).to include('value' => 'Value 1', 'count' => '500')
        expect(items.by_language).to include('value' => 'Value 2', 'count' => '300')
      end
    end

    describe '#by_type' do
      let(:stub_response) do
        { 'facet_counts' => { 'facet_pivot' => {
          'cho_edm_type.en_ssim,cho_has_type.en_ssim' => [
            { 'value' => 'Value 1', 'count' => '500', 'pivot' => {} },
            { 'value' => 'Value 2', 'count' => '300', 'pivot' => {} }
          ]
        } } }
      end

      it 'pulls the type/sub type pivot facet from the response' do
        expect(items.by_type.length).to eq 2
        expect(items.by_type).to include('value' => 'Value 1', 'count' => '500', 'pivot' => {})
        expect(items.by_type).to include('value' => 'Value 2', 'count' => '300', 'pivot' => {})
      end
    end

    describe 'locale aware field names' do
      it 'are available fo language and type fields (and maps to locale codes to bcp47 codes)' do
        expect(items.language_field).to eq 'cho_language.en_ssim'
        expect(items.type_facet).to eq 'cho_type_facet.en_ssim'

        allow(I18n).to receive(:locale).and_return('ar')

        expect(items.language_field).to eq 'cho_language.ar-Arab_ssim'
        expect(items.type_facet).to eq 'cho_type_facet.ar-Arab_ssim'
      end
    end
  end
end
