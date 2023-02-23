# frozen_string_literal: true

require 'rails_helper'

RSpec.describe DeleteResourcesJob do
  subject(:perform) { described_class.perform_now(url, exhibit) }

  let(:exhibit) { create(:exhibit) }

  let(:url) { 'http://s3/mybucket/myfile.json' }

  let(:mock_response) do
    instance_double(Faraday::Response, body: json, success?: true)
  end

  let(:json) do
    '{"id":"test_id", "agg_provider":"controller_test", ' \
      '"agg_data_provider":"controller_test", "cho_title":["Ancient artifact"]}'
  end

  before do
    allow(Faraday).to receive(:get).and_return(mock_response)
    allow(Rails.logger).to receive(:info)
  end

  context 'when a resource is found' do
    let!(:resource) { create(:dlme_json) }

    before do
      resource.reindex
      allow(DlmeJson).to receive(:find_by).and_return(resource)
    end

    it 'deletes resources' do
      expect { perform }.to change(DlmeJson, :count).by(-1)
      expect(Rails.logger).to have_received(:info).with('1 records were removed from http://s3/mybucket/myfile.json.')
    end
  end

  context 'when a resource is not found' do
    before do
      allow(DlmeJson).to receive(:find_by).and_return(nil)
    end

    it "doesn't raise any error" do
      perform
      expect(Rails.logger).to have_received(:info).with('1 records were removed from http://s3/mybucket/myfile.json.')
    end
  end
end
