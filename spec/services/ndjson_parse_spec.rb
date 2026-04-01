# frozen_string_literal: true

require 'rails_helper'

RSpec.describe NdjsonParse do
  subject(:parser) { described_class.new(body) }

  let(:body) do
    <<~NDJSON
      {"id":"record1","foo":"bar"}
      {"id":"record2","bar":"baz"}
      {"id":"record3","baz":"quux"}
    NDJSON
  end

  describe '#valid?' do
    context 'with a valid NDJSON body' do
      it 'returns true' do
        expect(parser.valid?).to be true
      end

      it 'sets no error' do
        parser.valid?
        expect(parser.error).to be_nil
      end
    end

    context 'when body is blank' do
      let(:body) { '' }

      it 'returns false' do
        expect(parser.valid?).to be false
      end

      it 'sets error to :no_body' do
        parser.valid?
        expect(parser.error).to eq(:no_body)
      end
    end

    context 'when body contains duplicate IDs' do
      let(:body) do
        <<~NDJSON
          {"id":"record1","foo":"bar"}
          {"id":"record1","bar":"baz"}
        NDJSON
      end

      it 'returns false' do
        expect(parser.valid?).to be false
      end

      it 'sets error to :duplicate_ids' do
        parser.valid?
        expect(parser.error).to eq(:duplicate_ids)
      end
    end

    context 'when body contains invalid JSON' do
      let(:body) { 'not json' }

      it 'returns false' do
        expect(parser.valid?).to be false
      end

      it 'sets error to :invalid_json' do
        parser.valid?
        expect(parser.error).to eq(:invalid_json)
      end
    end
  end

  describe '#filename' do
    it 'returns a timestamp-based ndjson filename' do
      expect(parser.filename).to match(/\A\d{12}\.ndjson\z/)
    end
  end

  describe '#filepath' do
    it 'returns the data_dir joined with filename' do
      expect(parser.filepath).to eq(File.join(Settings.data_dir, parser.filename))
    end
  end

  describe '#write' do
    it 'writes the body to the filepath' do
      allow(File).to receive(:write)
      parser.write
      expect(File).to have_received(:write).with(parser.filepath, body)
    end
  end
end
