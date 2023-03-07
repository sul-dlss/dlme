# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'display collections for an institution' do
  let(:curator) { create(:exhibit_curator, exhibit: exhibit) }
  let(:exhibit) { create(:exhibit) }

  before do
    AddResourcesJob.perform_now('spec/fixtures/ndjson/sample.ndjson',
                                exhibit: exhibit, local: true)
    sign_in curator
  end

  describe 'GET show' do
    context 'with English' do
      let(:provider_facet_field) { 'agg_provider_en' }
      let(:institution_name) { 'The Walters Art Museum' }

      it 'returns the new rows' do
        get "/#{exhibit.slug}/contributors/collection", params: { provider_facet_field => institution_name }
        expect(response).to have_http_status(:ok)
        expect(response.body).to start_with '<turbo-stream action="replace" target="474ab96f0c955ecd1a24a0603e549448"><template>'
        template = Nokogiri(response.body).css('template').first.inner_html
        parsed = Capybara.string(template)
        expect(parsed).to have_selector('tr', count: 2)
      end
    end

    context 'with Arabic' do
      let(:provider_facet_field) { 'agg_provider_ar' }
      let(:institution_name) { 'متحف والتر للفنون' }

      it 'returns the new rows' do
        get "/ar/#{exhibit.slug}/contributors/collection", params: { provider_facet_field => institution_name }
        expect(response).to have_http_status(:ok)
        expect(response.body).to start_with '<turbo-stream action="replace" target="2b34fe53e1a95e06a18406cfa3c99884"><template>'
        template = Nokogiri(response.body).css('template').first.inner_html
        parsed = Capybara.string(template)
        expect(parsed).to have_selector('tr', count: 2)
      end
    end
  end
end
