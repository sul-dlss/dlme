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
      let(:json) { '{}' }

      it 'sets no errors' do
        expect(valid?).to be true
        expect(instance.errors).to be_empty
      end
    end

    context 'when the JSON is not valid' do
      let(:json) { '{},' }

      it 'sets an error' do
        expect(valid?).to be false
        expect(instance.errors[:json]).to eq ['Invalid JSON']
      end
    end
  end
end
