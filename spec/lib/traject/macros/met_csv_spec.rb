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
  let(:instance) { klass.new }

  describe 'met_thumbnail' do
    subject(:extractor) { instance.met_thumbnail }

    let(:accum) { [] }
    let(:source_record) { instance_double(CSV::Row) }
    let(:context) do
      instance_double(Traject::Indexer::Context,
                      output_hash: { 'id' => ['12312'] },
                      source_record: source_record)
    end

    before do
      allow(MetThumbnailFetcher).to receive(:fetch)
        .with('12312')
        .and_return(thumbnail_url)
      extractor.call(nil, accum, context)
    end

    context 'when there is no thumbnail' do
      let(:thumbnail_url) { nil }

      it 'sets the value' do
        expect(accum).to eq []
      end
    end

    context 'when there is a thumbnail' do
      let(:thumbnail_url) { 'http://images.metmuseum.org/images/3' }

      it 'sets the value' do
        expect(accum).to eq [{ 'wr_id' => ['http://images.metmuseum.org/images/3'] }]
      end
    end
  end

  describe 'artist_role_bio' do
    subject { instance.artist_role_bio(row) }

    let(:row) { { 'Artist Begin Date' => '', 'Artist End Date' => '' } }

    context 'when artist role and bio are blank' do
      it { is_expected.to be_empty }
    end
  end
end
