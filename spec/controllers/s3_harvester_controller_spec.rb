# frozen_string_literal: true

require 'rails_helper'

RSpec.describe S3HarvesterController do
  let(:exhibit) { create(:exhibit) }
  let(:curator) { create(:exhibit_curator, exhibit: exhibit) }
  let(:url) { 'http://s3/mybucket/myfile.json' }

  before do
    sign_in curator
  end

  describe 'POST create' do
    context 'when the fetch fails' do
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

    describe 'when the fetch is successful' do
      let(:mock_response) do
        instance_double(Faraday::Response, body: json, success?: true)
      end

      let(:dlme_json) { build(:dlme_json, exhibit: exhibit) }

      let(:json) do
        '{"id":"test_id", "agg_provider":"controller_test", ' \
          '"agg_data_provider":"controller_test", "cho_title":["Ancient artifact"]}'
      end

      before do
        allow(Faraday).to receive(:get).and_return(mock_response)
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

    describe 'when the the record is not unique' do
      let(:mock_response) do
        instance_double(Faraday::Response, body: json, success?: true)
      end

      let(:json) do
        '{"id":"test_id", "agg_provider":"controller_test", ' \
          '"agg_data_provider":"controller_test", "cho_title":["Ancient artifact"]}'
      end

      before do
        create(:dlme_json, url: 'test_id', exhibit: exhibit)
        allow(Faraday).to receive(:get).and_return(mock_response)
      end

      it 'updates the existing record' do
        expect do
          post :create, params: { exhibit_id: exhibit.slug, url: url }
        end.not_to change(DlmeJson, :count)
        expect(flash[:notice]).to be_present
        expect(response).to be_redirect
      end
    end
  end
end
