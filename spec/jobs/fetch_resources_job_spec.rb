# frozen_string_literal: true

require 'rails_helper'

RSpec.describe FetchResourcesJob, type: :job do
  let(:exhibit) { create(:exhibit) }
  let(:url) { 'http://s3/mybucket/myfile.json' }
  let(:mock_response) do
    instance_double(Faraday::Response, body: json, success?: true)
  end
  let(:dlme_json) { build(:dlme_json, exhibit: exhibit) }

  let(:json) do
    '{"id":"test_id", "agg_provider":"controller_test", ' \
        '"agg_data_provider":"controller_test", "cho_title":["Ancient artifact"]}'
  end

  context 'when the record is unique' do
    before do
      allow(Faraday).to receive(:get).and_return(mock_response)
    end

    it 'adds the record' do
      expect { described_class.perform_now(url, exhibit) }.to change(DlmeJson, :count).by(1)
      expect(Faraday).to have_received(:get).with(url)
    end
  end

  context 'when the record is not unique' do
    before do
      allow(Faraday).to receive(:get).and_return(mock_response)
      create(:dlme_json, url: 'test_id', exhibit: exhibit)
    end

    it 'updates the existing record' do
      expect { described_class.perform_now(url, exhibit) }.not_to change(DlmeJson, :count)
      expect(Faraday).to have_received(:get).with(url)
    end
  end
end
