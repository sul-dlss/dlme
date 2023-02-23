# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Import resources from a file' do
  let(:curator) { create(:exhibit_curator, exhibit: exhibit) }
  let(:exhibit) { create(:exhibit) }
  let(:url) { 'myfile.json' }

  before do
    sign_in curator
  end

  describe 'POST create' do
    let(:body) { "{\"id\":\"one\"}\n{\"id\":\"two\"}" }

    before do
      allow(File).to receive(:exist?).and_return(true)
      allow(File).to receive(:read).and_return(body)
      allow(AddResourcesJob).to receive(:perform_later)
    end

    it 'submits a job' do
      post "/#{exhibit.slug}/harvests", params: { url: url }

      expect(AddResourcesJob).to have_received(:perform_later).with("tmp/data/#{url}", exhibit: exhibit, local: true)
      expect(flash[:notice]).to eq('Queued for processing.')
      expect(response).to redirect_to(spotlight.admin_exhibit_catalog_path(exhibit))
    end

    context 'when content at url contains duplicate identifiers' do
      let(:body) { "{\"id\":\"one\"}\n{\"id\":\"one\"}" }

      it 'redirects with an error flash message' do
        post "/#{exhibit.slug}/harvests", params: { url: url }

        expect(AddResourcesJob).not_to have_received(:perform_later)
        expect(flash[:error]).to eq('JSON contained duplicate identifiers')
        expect(response).to redirect_to(spotlight.new_exhibit_resource_path(exhibit))
      end
    end
  end
end
