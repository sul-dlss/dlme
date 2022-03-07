# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CatalogController do
  render_views

  let(:search_service) { instance_double(Blacklight::SearchService) }

  before do
    allow(controller).to receive(:search_service).and_return(search_service)
  end

  describe 'GET index' do
    context 'with a bot' do
      it 'prevents deep paging' do
        request.headers['HTTP_USER_AGENT'] = 'I am a bot'

        get :index, params: { page: 500 }

        expect(response.status).to eq 429
      end
    end
  end

  describe 'GET show' do
    let(:search_service) { instance_double(Blacklight::SearchService, fetch: [double, doc]) }
    let(:doc) do
      SolrDocument.new(
        id: 'xyz',
        cho_identifier_ssim: ['Part 1', 'Part 2'],
        __raw_resource_json_ss: { a: 1 }.to_json
      )
    end

    context 'with the JSON API response' do
      it 'preserves multivalued fields' do
        get :show, params: { id: 'xyz', format: :json }

        expect(response).to be_successful
        obj = JSON.parse(response.body).with_indifferent_access
        expect(obj.dig(:data, :attributes, :identifier, :attributes, :value)).to eq ['Part 1', 'Part 2']
      end

      it 'includes the IR as a nicely parsed JSON blob' do
        get :show, params: { id: 'xyz', format: :json }

        expect(response).to be_successful
        obj = JSON.parse(response.body).with_indifferent_access
        expect(obj.dig(:data, :attributes, :__raw_resource_json_ss, :attributes, :value)).to include(a: 1)
      end
    end

    context 'with the raw query param' do
      it 'returns the raw solr document' do
        get :show, params: { id: 'xyz', raw: true }

        expect(response).to be_successful
        expect(JSON.parse(response.body).with_indifferent_access).to include(id: 'xyz')
      end
    end
  end
end
