# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CatalogController do
  render_views

  let(:search_service) { instance_double(Blacklight::SearchService) }

  before do
    allow(controller).to receive(:search_service).and_return(search_service)
  end

  describe 'GET show' do
    let(:search_service) { instance_double(Blacklight::SearchService, fetch: [double, doc]) }
    let(:doc) { SolrDocument.new(id: 'xyz') }

    context 'with the raw query param' do
      it 'returns the raw solr document' do
        get :show, params: { id: 'xyz', raw: true }

        expect(response).to be_successful
        expect(JSON.parse(response.body).with_indifferent_access).to include(id: 'xyz')
      end
    end
  end
end
