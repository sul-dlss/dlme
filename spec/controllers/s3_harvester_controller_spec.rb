# frozen_string_literal: true

require 'rails_helper'

RSpec.describe S3HarvesterController do
  let(:curator) { create(:exhibit_curator, exhibit: exhibit) }
  let(:exhibit) { create(:exhibit) }
  let(:spotlight) { Spotlight::Engine.routes.url_helpers }
  let(:url) { 'http://s3/mybucket/myfile.json' }

  before do
    sign_in curator
  end

  describe 'POST create' do
    let(:body) { "{\"id\":\"one\"}\n{\"id\":\"two\"}" }

    before do
      allow(controller).to receive(:body).and_return(body)
      allow(FetchResourcesJob).to receive(:perform_later)
    end

    it 'submits a job' do
      post :create, params: { exhibit_id: exhibit.slug, url: url }
      expect(FetchResourcesJob).to have_received(:perform_later).with(url, exhibit)
      expect(flash[:notice]).to eq('Queued for processing.')
      expect(response).to redirect_to(spotlight.admin_exhibit_catalog_path(exhibit))
    end

    context 'when content at url contains duplicate identifiers' do
      let(:body) { "{\"id\":\"one\"}\n{\"id\":\"one\"}" }

      it 'redirects with an error flash message' do
        post :create, params: { exhibit_id: exhibit.slug, url: url }
        expect(FetchResourcesJob).not_to have_received(:perform_later)
        expect(flash[:error]).to eq('JSON contained duplicate identifiers')
        expect(response).to redirect_to(spotlight.new_exhibit_resource_path(exhibit))
      end
    end
  end
end
