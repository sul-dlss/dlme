# frozen_string_literal: true

require 'rails_helper'

RSpec.describe MultilingualLocaleAwareField do
  let(:stub_class) do
    Class.new do
      include MultilingualLocaleAwareField
    end
  end

  describe '#lang_config' do
    let(:lang_config) { stub_class.new.lang_config }

    it 'sorts the relevant locales first in the default fallback language codes' do
      ar_default = lang_config['ar'].last['default']
      en_default = lang_config['en'].last['default']

      expect(ar_default.take(4)).to all(match(/-Arab/))
      expect(en_default.take(4)).to all(match(/-Latn/))
    end

    # If this test fails its likely because "en" is not first in acceptable_bcp47_codes
    it 'returns "en" after the sorted language codes' do
      first_non_arab_langauge = lang_config['ar'].last['default'].find { |lang| !lang.end_with?('-Arab') }
      expect(first_non_arab_langauge).to eq 'en'
    end
  end
end
