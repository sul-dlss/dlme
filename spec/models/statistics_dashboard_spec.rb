# frozen_string_literal: true

require 'rails_helper'

RSpec.describe StatisticsDashboard do
  subject(:dashboard) do
    described_class.new(search_service: instance_double(
      'SearchService',
      repository: instance_double(Blacklight::Solr::Repository, search: stub_response),
      search_builder: {}
    ))
  end

  let(:stub_response) do
    { 'response' => { 'numFound' => 100 } }
  end

  it 'has items' do
    expect(dashboard.items).to be_a StatisticsDashboard::Items
  end

  describe 'Collections' do
    let(:stub_response) do
      { 'facet_counts' => { 'facet_fields' => {
        'agg_data_provider_collection_ssim' => ['Value 1', '500', 'Value 2', '300']
      } } }
    end

    describe '#total' do
      it 'is the number of collections' do
        expect(dashboard.collections.total).to eq 2
      end
    end
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
      it 'are available for language and type fields (and maps to locale codes to bcp47 codes)' do
        expect(items.language_field).to eq 'cho_language.en_ssim'
        expect(items.language_facet_field).to eq 'language_en'
        expect(items.type_facet).to eq 'cho_type_facet.en_ssim'

        allow(I18n).to receive(:locale).and_return('ar')

        expect(items.language_field).to eq 'cho_language.ar-Arab_ssim'
        expect(items.language_facet_field).to eq 'language_ar'
        expect(items.type_facet).to eq 'cho_type_facet.ar-Arab_ssim'
      end
    end
  end

  describe 'Data Contributors' do
    let(:contributors) { dashboard.data_contributors }

    let(:country1) do
      {
        'value' => 'Country 1',
        'count' => '500',
        'pivot' => [
          { value: 'the/coll/1', 'count' => '5' },
          { value: 'the/coll/2', 'count' => '2' },
          { value: 'the/coll/3', 'count' => '50' }
        ]
      }
    end
    let(:country2) { { 'value' => 'Country 2', 'count' => '300', 'pivot' => [{ value: 'coll/1', 'count' => '3' }] } }

    let(:stub_response) do
      { 'facet_counts' => { 'facet_pivot' => {
        'agg_provider.en_ssim,agg_provider_country.en_ssim,agg_data_provider_collection_ssim' => [
          { 'value' => 'Institution 1', 'count' => '500', 'pivot' => [country1] },
          { 'value' => 'Institution 2', 'count' => '300', 'pivot' => [country2] }
        ]
      } } }
    end

    it { expect(contributors).to be_kind_of(StatisticsDashboard::Contributors) }

    it 'has the total from the total number of institutions in the response' do
      expect(contributors.total).to be 2
    end

    describe '#total_countries' do
      before do
        pivot_field = 'agg_provider.en_ssim,agg_provider_country.en_ssim,agg_data_provider_collection_ssim'
        stub_response['facet_counts']['facet_pivot'][pivot_field] << {
          'value' => 'Institution 3', 'count' => '100', 'pivot' => [country1]
        }
      end

      it 'has the total number of unique countries that the institutions are from' do
        expect(contributors.institutions.count).to eq 3
        expect(contributors.institutions.last.name).to be 'Institution 3' # validate our new institution is present
        expect(contributors.total_countries).to eq 2 # Our new institution has the same country as "Institution 1"
      end
    end

    it 'has a locale aware provider_field accessor' do
      expect(contributors.provider_field).to eq 'agg_provider.en_ssim'

      allow(I18n).to receive(:locale).and_return('ar')

      expect(contributors.provider_field).to eq 'agg_provider.ar-Arab_ssim'
    end

    it 'has a locale aware provider_facet_field accessor' do
      expect(contributors.provider_facet_field).to eq 'agg_provider_en'

      allow(I18n).to receive(:locale).and_return('ar')

      expect(contributors.provider_facet_field).to eq 'agg_provider_ar'
    end

    describe '#institutions' do
      let(:institutions) { contributors.institutions }

      it { expect(institutions.length).to eq 2 }
      it { expect(institutions).to all(be_kind_of(StatisticsDashboard::Contributors::Institution)) }

      it 'has a name, an item count, and the country' do
        expect(institutions.first.name).to eq 'Institution 1'
        expect(institutions.first.countries).to eq ['Country 1']
        expect(institutions.first.item_count).to eq '500'

        expect(institutions.last.name).to eq 'Institution 2'
        expect(institutions.last.countries).to eq ['Country 2']
        expect(institutions.last.item_count).to eq '300'
      end

      it 'has a collection count that adds all the collection numbers' do
        expect(institutions.first.collection_count).to eq 3
        expect(institutions.last.collection_count).to eq 1
      end

      context 'when an institution is in multiple countries' do
        let(:country4) { { 'value' => 'Country 4', 'count' => '17', 'pivot' => [{ value: 'coll/4', 'count' => '17' }] } }

        before do
          pivot_field = 'agg_provider.en_ssim,agg_provider_country.en_ssim,agg_data_provider_collection_ssim'
          stub_response['facet_counts']['facet_pivot'][pivot_field][0]['pivot'] << country4
        end

        it 'returns them in the countries accessor' do
          expect(institutions.first.countries).to eq ['Country 1', 'Country 4']
        end
      end
    end
  end

  describe 'Item Contributors' do
    let(:contributors) { dashboard.item_contributors }

    it 'has a locale aware provider_field accessor' do
      expect(contributors.provider_field).to eq 'agg_data_provider.en_ssim'

      allow(I18n).to receive(:locale).and_return('ar')

      expect(contributors.provider_field).to eq 'agg_data_provider.ar-Arab_ssim'
    end
  end
end
