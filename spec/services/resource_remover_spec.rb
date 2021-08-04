# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ResourceRemover do
  describe '.remove_all_resources' do
    before do
      # create resources in a couple different exhibits, and reindex
      create_list(:dlme_json_unique_id, 3, exhibit: create(:exhibit)).each(&:reindex)
      create_list(:dlme_json_unique_id, 2, exhibit: create(:exhibit)).each(&:reindex)
    end

    let(:blacklight_solr) do
      connection_config = Blacklight.connection_config
      RSolr.connect(connection_config.merge(adapter: connection_config[:http_adapter]))
    end

    it 'unindexes all resources' do
      expect { described_class.remove_all_resources }.to change {
        query_response = blacklight_solr.get('select', params: { q: '*:*' })
        query_response['response']['docs'].size
      }.by(-5)
    end

    it 'deletes all resources from the database' do
      expect { described_class.remove_all_resources }.to change(DlmeJson, :count).by(-5)
    end

    it 'returns the count of the number of resources deleted' do
      expect(described_class.remove_all_resources).to eq 5
    end
  end
end
