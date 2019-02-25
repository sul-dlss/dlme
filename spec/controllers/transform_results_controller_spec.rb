# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TransformResultsController do
  let(:exhibit) { create(:exhibit) }
  let(:curator) { create(:exhibit_curator, exhibit: exhibit) }

  before do
    sign_in curator
  end

  describe 'GET show' do
    it 'is successful' do
      get :show
      expect(response).to be_successful
    end
  end

  describe 'POST create' do
    let(:msg) do
      '{"Message": "{\n  \"success\": true,\n  \"records\": 1,\n  \"data_path\": \"stanford/maps/data/' \
      'kj751hs0595.mods\",\n  \"timestamp\": \"2019-02-22T19:04:24+00:00\",\n  \"duration\": 0,\n  \"url\": ' \
      '\"http://localstack:4572/dlme-transform/output-20190222190423.ndjson\"\n}\n", "Type": "Notification", ' \
      '"TopicArn": "arn:aws:sns:us-east-1:123456789012:dlme-transform", "MessageId": "8456e5c9-2fcf-4866-9c4f-b5bf3b898938"}'
    end

    before do
      allow(TransformResult).to receive(:create)
    end

    # rubocop:disable RSpec/ExampleLength
    it 'returns 200' do
      post :create, body: msg
      expect(TransformResult).to have_received(:create).with(
        url: 'http://localstack:4572/dlme-transform/output-20190222190423.ndjson',
        data_path: 'stanford/maps/data/kj751hs0595.mods',
        success: true,
        records: 1,
        timestamp: DateTime.iso8601('2019-02-22T19:04:24+00:00'),
        duration: 0,
        error: nil
      )
      expect(response).to be_successful
    end
    # rubocop:enable RSpec/ExampleLength
  end
end
