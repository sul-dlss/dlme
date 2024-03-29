# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'transform results' do
  context 'when signed in' do
    let(:curator) { create(:exhibit_curator) }
    let(:body) { response.parsed_body.with_indifferent_access }

    before do
      sign_in curator
    end

    it 'shows transform results' do
      get '/transform_result'
      expect(response).to have_http_status(:ok)
    end

    it 'includes navigation links' do
      get '/transform_result'
      expect(body[:links]).not_to be_nil
    end

    it 'with paginated results' do
      create_list(:transform_result, 26)
      get '/transform_result'
      expect(response).to have_http_status(:ok)
    end
  end

  context 'when POSTing to create' do
    let(:msg) do
      '{"Message": "{\n  \"success\": true,\n  \"records\": 1,\n  \"data_path\": \"stanford/maps/data/' \
        'kj751hs0595.mods\",\n  \"timestamp\": \"2019-02-22T19:04:24+00:00\",\n  \"duration\": 0,\n  \"url\": ' \
        '\"http://localstack:4572/dlme-transform/output-20190222190423.ndjson\"\n}\n", "Type": "Notification", ' \
        '"TopicArn": "arn:aws:sns:us-east-1:123456789012:dlme-transform", "MessageId": "8456e5c9-2fcf-4866-9c4f-b5bf3b898938"}'
    end

    # The SNS https endpoint is setting Content-Type to 'text/plain' even though it's pushing JSON.
    # See https://forums.aws.amazon.com/thread.jspa?threadID=69413
    let(:headers) { { 'Content-Type' => 'text/plain' } }
    let(:transform_result) { class_double(TransformResult) }

    before do
      allow(TransformResult).to receive(:find_or_initialize_by).and_return(transform_result)
      allow(transform_result).to receive(:update)
    end

    it 'creates the TransformResult' do
      post '/transform_result', params: msg, headers: headers
      expect(TransformResult).to have_received(:find_or_initialize_by).with(url: 'http://localstack:4572/dlme-transform/output-20190222190423.ndjson',
                                                                            data_path: 'stanford/maps/data/kj751hs0595.mods')
      expect(transform_result).to have_received(:update).with(success: true,
                                                              records: 1,
                                                              timestamp: DateTime.iso8601('2019-02-22T19:04:24+00:00'),
                                                              duration: 0,
                                                              error: nil)
      expect(response).to have_http_status(:created)
    end
  end
end
