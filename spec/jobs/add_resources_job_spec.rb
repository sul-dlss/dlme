# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AddResourcesJob do
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

  context 'with data that is not valid JSON' do
    let(:json) { 'foo bar' }

    it 'raises a RuntimeError' do
      expect do
        described_class.perform_now(url, exhibit: exhibit)
      end.to raise_error(RuntimeError, "Resource 1 in #{url} is invalid JSON: #{json}")
    end
  end

  context 'when the record is unique' do
    it 'adds the record' do
      allow(exhibit).to receive(:touch)
      expect { described_class.perform_now(url, exhibit: exhibit) }.to change(DlmeJson, :count).by(1)
      expect(Faraday).to have_received(:get).with(url)
      expect(exhibit).to have_received(:touch).once
    end
  end

  context 'when the record is not unique' do
    before do
      create(:dlme_json, url: 'test_id', exhibit: exhibit)
    end

    it 'updates the existing record' do
      expect { described_class.perform_now(url, exhibit: exhibit) }.not_to change(DlmeJson, :count)
      expect(Faraday).to have_received(:get).with(url)
    end
  end

  context 'when the record is a local file' do
    it 'adds the record' do
      allow(File).to receive(:read).and_return(json)
      expect { described_class.perform_now(url, exhibit: exhibit, local: true) }.to change(DlmeJson, :count).by(1)
    end
  end
end
