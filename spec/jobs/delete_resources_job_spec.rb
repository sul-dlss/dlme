# frozen_string_literal: true

require 'rails_helper'

RSpec.describe DeleteResourcesJob, type: :job do
  let(:exhibit) { create(:exhibit) }
  let!(:resource) { create(:dlme_json) }

  let(:url) { 'http://s3/mybucket/myfile.json' }

  let(:mock_response) do
    instance_double(Faraday::Response, body: json, success?: true)
  end

  let(:json) do
    '{"id":"test_id", "agg_provider":"controller_test", ' \
        '"agg_data_provider":"controller_test", "cho_title":["Ancient artifact"]}'
  end

  before do
    resource.reindex
    allow(DlmeJson).to receive(:find_by).and_return(resource)
    allow(Faraday).to receive(:get).and_return(mock_response)
  end

  it 'deletes resources' do
    expect { described_class.perform_now(url, exhibit) }
      .to change(DlmeJson, :count).by(-1)
  end
end
