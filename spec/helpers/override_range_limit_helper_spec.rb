# frozen_string_literal: true

require 'rails_helper'

RSpec.describe OverrideRangeLimitHelper, type: :helper do
  describe '#format_range_display_value' do
    it 'does not do anything unless a specified facet field' do
      expect(helper.format_range_display_value('1234', 'language_en')).to eq '1234'
    end

    it 'modifies a configured hijiri field' do
      expect(helper.format_range_display_value('-8746', 'cho_date_range_hijri_isim')).to eq '8746 BH'
      expect(helper.format_range_display_value('597', 'cho_date_range_hijri_isim')).to eq '597 H'
    end

    context 'when in in Arabic' do
      it 'displays Arabic suffix' do
        I18n.with_locale(:ar) do
          expect(helper.format_range_display_value('-8746', 'cho_date_range_hijri_isim')).to eq '8746 قبل الهجري'
        end
      end
    end

    it 'modifies a configured gregorian field' do
      expect(helper.format_range_display_value('-5513', 'cho_date_range_norm_isim')).to eq '5513 BCE'
      expect(helper.format_range_display_value('1782', 'cho_date_range_norm_isim')).to eq '1782 CE'
    end
  end
end
