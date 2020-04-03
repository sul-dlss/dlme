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
      expect(helper.range_display('cho_date_range_hijri_isim', params)).to eq '<span class="from">8746 BH</span> to <span class="to">597 H</span>'
    end

    it 'modifies a configured gregorian field' do
      expect(helper.range_display('cho_date_range_norm_isim', params)).to eq '<span class="from">5513 BCE</span> to <span class="to">1782 CE</span>'
    end
  end
end
