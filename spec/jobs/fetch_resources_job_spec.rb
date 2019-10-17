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

  before do
    allow(Faraday).to receive(:get).and_return(mock_response)
  end

  context 'with data that does not pass schema validation' do
    let(:json) { '{}' }

    # rubocop:disable Metrics/LineLength
    it 'raises a RuntimeError and includes schema validation errors' do
      expect do
        described_class.perform_now(url, exhibit)
      end.to raise_error(RuntimeError,
                         "Resource 1 in #{url} is not valid: Json 'cho_title' is missing. 'id' is missing. 'agg_data_provider' is missing. 'agg_provider' is missing")
    end
    # rubocop:enable Metrics/LineLength
  end

  context 'with data that is not valid JSON' do
    let(:json) { 'foo bar' }

    it 'raises a RuntimeError' do
      expect do
        described_class.perform_now(url, exhibit)
      end.to raise_error(RuntimeError, "Resource 1 in #{url} is invalid JSON: #{json}")
    end
  end

  context 'when the record is unique' do
    it 'adds the record' do
      expect { described_class.perform_now(url, exhibit) }.to change(DlmeJson, :count).by(1)
      expect(Faraday).to have_received(:get).with(url)
    end
  end

  context 'when the record is not unique' do
    before do
      create(:dlme_json, url: 'test_id', exhibit: exhibit)
    end

    it 'updates the existing record' do
      expect { described_class.perform_now(url, exhibit) }.not_to change(DlmeJson, :count)
      expect(Faraday).to have_received(:get).with(url)
    end
  end
end
