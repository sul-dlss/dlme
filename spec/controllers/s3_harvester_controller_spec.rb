# frozen_string_literal: true

require 'rails_helper'

RSpec.describe S3HarvesterController do
  let(:exhibit) { create(:exhibit) }
  let(:curator) { create(:exhibit_curator, exhibit: exhibit) }
  let(:url) { 'http://s3/mybucket/myfile.json' }

  before do
    sign_in curator
  end

  describe 'POST create fails' do
    before do
      allow(Faraday).to receive(:get).and_return(nil)
    end

    it 'redirects and flashes error' do
      post :create, params: { exhibit_id: exhibit.slug, url: url }
      expect(Faraday).to have_received(:get).with(url)
      expect(flash[:error]).to be_present
      expect(response).to be_redirect
    end
  end

  describe 'POST create succeeds' do
    let(:mock_response) { instance_double(Faraday::Response) }

    let(:dlme_json) { create(:dlme_json) }

    let(:json) do
      '{"id":"test_id", "agg_provider":"controller_test", ' \
        '"agg_data_provider":"controller_test", "cho_title":["Ancient artifact"]}'
    end

    before do
      allow(Faraday).to receive(:get).and_return(mock_response)
      allow(mock_response).to receive(:success?).and_return(true)
      allow(mock_response).to receive(:body).and_return(json)
      allow(DlmeJson).to receive(:new).and_return(dlme_json)
      allow(dlme_json).to receive(:save_and_index)
    end

    it 'redirects and flashes notice' do
      post :create, params: { exhibit_id: exhibit.slug, url: url }
      expect(Faraday).to have_received(:get).with(url)
      expect(dlme_json).to have_received(:save_and_index)
      expect(flash[:notice]).to be_present
      expect(response).to be_redirect
    end
  end
end
