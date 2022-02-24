# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SearchBuilder do
  subject(:search_builder) { described_class.new scope }

  let(:blacklight_config) { Blacklight::Configuration.new }
  let(:scope) { instance_double ApplicationController, blacklight_config: blacklight_config }

  describe '#min_match_for_boolean' do
    subject(:solr_parameters) do
      search_builder.with(query).processed_parameters
    end

    context 'when query has a boolean operator' do
      let(:query) { { q: 'jupiter AND (mars OR saturn)' } }

      it 'sets min match to 1' do
        expect(solr_parameters[:mm]).to eq('1')
      end
    end

    context 'when query has no boolean operator' do
      let(:query) { { q: 'jupiter' } }

      it 'does not set min match' do
        expect(solr_parameters[:mm]).to be_nil
      end
    end
  end
end
