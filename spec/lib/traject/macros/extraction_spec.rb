# frozen_string_literal: true

require 'rails_helper'
require 'traject/macros/extraction'

RSpec.describe Macros::Extraction do
  describe Macros::Extraction::TransformPipeline do
    subject(:pipeline) { described_class.new(options) }

    describe '#split' do
      let(:options) { { split: '|' } }

      context 'With two values' do
        let(:data) { ['First half of the string|Second half of the string'] }

        it 'Retuns an array of the values' do
          expect(pipeline.transform(data)).to eq ['First half of the string', 'Second half of the string']
        end
      end
    end

    describe '#trim' do
      let(:options) { { trim: true } }

      context 'Where there is leading and trailing whitespace' do
        let(:data) { ['    This is a string with a lot of whitespace    '] }

        it 'Removes the leading and trailing whitespace' do
          expect(pipeline.transform(data)).to eq ['This is a string with a lot of whitespace']
        end
      end
    end

    describe '#default' do
      let(:options) { { default: ['No value'] } }

      it 'uses the original value when present' do
        expect(pipeline.transform(['Some value'])).to eq ['Some value']
      end

      it 'uses the default value when the original is empty' do
        expect(pipeline.transform([])).to eq ['No value']
      end
    end

    describe '#translation_map' do
      let(:options) { { translation_map: 'edm_types' } }

      it 'looks up a value from the translation map' do
        expect(pipeline.transform(['audio'])).to eq ['sound']
      end
    end
  end
end
