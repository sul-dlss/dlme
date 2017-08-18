# frozen_string_literal: true

require 'rails_helper'

RSpec.describe DlmeJson do
  let(:instance) do
    described_class.new(data: { json: json },
                        exhibit: exhibit)
  end
  let(:exhibit) { Spotlight::Exhibit.new }

  describe 'valid?' do
    subject(:valid?) { instance.valid? }

    context 'when the JSON is valid' do
      let(:json) { File.read('spec/fixtures/json/embeddable.json') }

      it 'sets no errors' do
        expect(valid?).to be true
        expect(instance.errors).to be_empty
      end
    end

    context 'when the JSON is not parsable' do
      let(:json) { '{},' }

      it 'sets an error' do
        expect(valid?).to be false
        expect(instance.errors[:json]).to eq ['Invalid JSON']
      end
    end

    context 'when the JSON is not semantically correct' do
      let(:json) { '{"id":"baddy"}' }

      it 'sets an error' do
        expect(valid?).to be false
        expect(instance.errors[:json]).to eq ["'cho_title' is missing. 'agg_data_provider' is missing. 'agg_provider' is missing"]
      end
    end
  end
end
