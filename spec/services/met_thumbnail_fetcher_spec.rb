# frozen_string_literal: true

require 'rails_helper'

RSpec.describe MetThumbnailFetcher do
  describe 'fetch' do
    subject { described_class.fetch('12312') }

    let(:response) { instance_double Faraday::Response, body: json, success?: true }

    before do
      allow(Faraday).to receive(:get)
        .with(URI('http://www.metmuseum.org/api/Collection/additionalImages?crdId=12312'))
        .and_return(response)
    end

    context 'when the results are empty' do
      let(:json) do
        '{"results":[]}'
      end

      it { is_expected.to be nil }
    end

    context 'when the results are null' do
      let(:json) do
        '{"results":null}'
      end

      it { is_expected.to be nil }
    end

    context 'when there is a thumbnail' do
      let(:json) do
        '{"results":[{"webImageUrl":"http://images.metmuseum.org/images/3"}]}'
      end

      it { is_expected.to eq 'http://images.metmuseum.org/images/3' }
    end
  end
end
