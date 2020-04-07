# frozen_string_literal: true

require 'rails_helper'

RSpec.describe OverrideRangeLimitHelper, type: :helper do
  describe '#range_display' do
    params = {
      range: {
        'cho_date_range_hijri_isim' => {
          'begin' => '-8746',
          'end' => '597'
        },
        'cho_date_range_norm_isim' => {
          'begin' => '-5513',
          'end' => '1782'
        }
      }
    }
    it 'does not do anything unless a configured facet field' do
      expect(helper.range_display('language_en', params)).to eq ''
    end

    it 'modifies a configured hijiri field' do
      range_display = helper.range_display('cho_date_range_hijri_isim', params)
      expect(range_display).to have_css '.from', text: '8746 BH'
      expect(range_display).to have_css '.to', text: '597 H'
    end

    context 'when in in Arabic' do
      it 'displays Arabic suffix' do
        I18n.with_locale(:ar) do
          range_display = helper.range_display('cho_date_range_hijri_isim', params)
          expect(range_display).to have_css '.from', text: '8746 قبل ه'
        end
      end
    end

    it 'modifies a configured gregorian field' do
      range_display = helper.range_display('cho_date_range_norm_isim', params)
      expect(range_display).to have_css '.from', text: '5513 BCE'
      expect(range_display).to have_css '.to', text: '1782 CE'
    end
  end
end
