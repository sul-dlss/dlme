# frozen_string_literal: true

require 'rails_helper'
require 'traject/macros/csv'

RSpec.describe Macros::Csv do
  let(:klass) do
    Class.new do
      include Macros::Csv
    end
  end

  describe 'normalize_numismatic_date' do
    subject(:extractor) { instance.normalize_numismatic_date }

    let(:accum) { [] }
    let(:context) { nil }
    let(:instance) { klass.new }

    before do
      extractor.call(row, accum, context)
    end

    context 'with a single year' do
      let(:row) { { 'Year' => '1955' } }

      it 'sets the value' do
        expect(accum).to eq ['1955']
      end
    end

    context 'when the year is a string (with a range)' do
      let(:row) { { 'Year' => '1955|1972' } }

      it 'sets the value' do
        expect(accum).to eq ['1955-1972']
      end
    end
  end
end
