# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Catalog controller', type: :routing do
  describe 'routing' do
    context 'when the routing constraint is set to allow periods' do
      let(:doc) do
        SolrDocument.new(id: 'https://gallica.bnf.fr/ark:/12148/bpt6k91073505')
      end

      it 'routes to #show' do
        expect(get('/1/catalog/gallica.bnf.fr')).to route_to('spotlight/catalog#show', exhibit_id: '1', id: 'gallica.bnf.fr')
        expect(solr_document_path(nil, doc)).to eq '/catalog/https:%2F%2Fgallica.bnf.fr%2Fark:%2F12148%2Fbpt6k91073505'
      end
    end
  end
end
