# frozen_string_literal: true

require 'spec_helper'
require 'traject/macros/mods'
require 'nokogiri'

RSpec.describe Macros::Mods do
  let(:klass) do
    Class.new do
      include Macros::Mods
    end
  end

  describe 'mods_titles' do
    let(:accum) { [] }
    let(:xml) do
      Nokogiri::XML(
        '<?xml version="1.0" encoding="UTF-8"?>
        <mods xmlns="http://www.loc.gov/mods/v3"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="3.3"
              xsi:schemaLocation="http://www.loc.gov/mods/v3 http://www.loc.gov/standards/mods/v3/mods-3-3.xsd">
          <titleInfo>
            <title>My title</title>
            <partNumber>My title</title>
            <partName>My subtitle</partName>
            <subTitle>My subtitle</subTitle>
          </titleInfo>
        </mods>'
      )
    end

    let(:instance) { klass.new }

    context 'when filtering out duplicates' do
      subject(:extractor) { instance.mods_titles(allow_duplicate_values: false) }

      it 'deduplicates titles' do
        extractor.call(xml, accum, nil)
        expect(accum).to eq ['My title', 'My subtitle']
      end
    end

    context 'without deduplication' do
      subject(:extractor) { instance.mods_titles }

      it 'returns all titles' do
        extractor.call(xml, accum, nil)
        expect(accum).to eq ['My title', 'My subtitle', 'My title', 'My subtitle']
      end
    end
  end
end
