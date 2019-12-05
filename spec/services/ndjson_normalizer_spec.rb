# frozen_string_literal: true

require 'rails_helper'

RSpec.describe NdjsonNormalizer do
  subject(:normalizer) { described_class.new(ndjson, url) }

  let(:ndjson) do
    <<~NDJSON
      {"id":"record1","foo":"bar"}
      {"id":"record2","bar":"baz"}
      {"id":"record3","baz":"quux"}
    NDJSON
  end
  let(:url) { 'http://foo.example.edu/not/important/here' }

  describe '.normalize' do
    let(:instance) { described_class.new(ndjson, url) }

    before do
      allow(described_class).to receive(:new).and_return(instance)
      allow(instance).to receive(:normalize)
    end

    it 'calls #normalize on a new instance' do
      described_class.normalize(ndjson, url)
      expect(instance).to have_received(:normalize)
    end
  end

  describe '#new' do
    it 'has an ndjson attribute' do
      expect(normalizer.ndjson).to eq(ndjson)
    end

    it 'has a url attribute' do
      expect(normalizer.url).to eq(url)
    end
  end

  # rubocop:disable Style/BracesAroundHashParameters
  describe '#normalize' do
    context 'when on the happy path' do
      it 'returns an array of hashes' do
        expect(normalizer.normalize).to include(
          { 'id' => 'record1', 'foo' => 'bar' },
          { 'id' => 'record2', 'bar' => 'baz' },
          { 'id' => 'record3', 'baz' => 'quux' }
        )
      end
    end

    context 'with a single line of input' do
      let(:ndjson) { '{"id":"record4"}' }

      it 'returns a one-element array with a hash' do
        expect(normalizer.normalize).to eq([{ 'id' => 'record4' }])
      end
    end

    context 'with blank lines' do
      let(:ndjson) do
        <<~NDJSON
          {"id":"record1","foo":"bar"}



          {"id":"record2","bar":"baz"}
          {"id":"record3","baz":"quux"}
        NDJSON
      end

      it 'filters them out' do
        expect(normalizer.normalize).to include(
          { 'id' => 'record1', 'foo' => 'bar' },
          { 'id' => 'record2', 'bar' => 'baz' },
          { 'id' => 'record3', 'baz' => 'quux' }
        )
      end
    end

    context 'with bad json' do
      let(:ndjson) { 'not json' }

      it 'raises a RuntimeError with a useful message' do
        expect { normalizer.normalize }.to raise_error(
          RuntimeError,
          "Resource 1 in #{url} is invalid JSON: #{ndjson}"
        )
      end
    end
  end
  # rubocop:enable Style/BracesAroundHashParameters
end
