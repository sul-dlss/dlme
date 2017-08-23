# frozen_string_literal: true

require 'rails_helper'
require 'traject/macros/met_csv'
require 'traject/macros/dlme'
require 'csv'

RSpec.describe Macros::MetCsv do
  let(:klass) do
    Class.new do
      include Macros::MetCsv
      include Macros::DLME # for transform_values()
      include Traject::Macros::Basic # for literal()
    end
  end

  describe 'met_thumbnail' do
    subject(:extractor) { instance.met_thumbnail }

    let(:accum) { [] }
    let(:source_record) { instance_double(CSV::Row) }
    let(:context) do
      instance_double(Traject::Indexer::Context,
                      output_hash: { 'id' => ['12312'] },
                      source_record: source_record)
    end

    let(:instance) { klass.new }

    let(:response) { instance_double Faraday::Response, body: json, success?: true }

    before do
      allow(Faraday).to receive(:get)
        .with(URI('http://www.metmuseum.org/api/Collection/additionalImages?crdId=12312'))
        .and_return(response)
      extractor.call(nil, accum, context)
    end

    context 'when there is no thumbnail' do
      let(:json) do
        '{"results":[]}'
      end

      it 'sets the value' do
        expect(accum).to eq []
      end
    end

    context 'when there is a thumbnail' do
      let(:json) do
        '{"results":[{"webImageUrl":"http://images.metmuseum.org/images/3"}]}'
      end

      it 'sets the value' do
        expect(accum).to eq [{ 'wr_id' => ['http://images.metmuseum.org/images/3'] }]
      end
    end
  end
end
