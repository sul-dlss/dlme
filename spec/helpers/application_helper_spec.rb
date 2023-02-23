# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ApplicationHelper do
  before do
    helper.controller.singleton_class.class_eval do
      include Blacklight::Controller
    end
  end

  describe '#link_type_hierarchy' do
    let(:document) { SolrDocument.new('cho_type_facet.en_ssim': field_data) }
    let(:config) { CatalogController.blacklight_config.show_fields['type_hierarchy'] }
    let(:field_data) { [] }

    it 'is nil when the data needed to build the hierarchy is not present' do
      expect(helper.link_type_hierarchy(document: document, config: config)).to be_nil
    end

    context 'with a single value' do
      let(:field_data) { ['Sound'] }

      it 'links a single value' do
        link = helper.link_type_hierarchy(
          document: document,
          config: config
        )
        expect(link).to have_link('Sound', href: /\?f%5Bcho_type_facet.en_ssim%5D%5B%5D=Sound&?/)
      end
    end

    context 'with multiple values' do
      let(:field_data) { ['Sound', 'Sound:Interview'] }

      it 'links multiple values (with each value including all preceeding values)' do
        links = helper.link_type_hierarchy(
          document: document,
          config: config
        )

        expect(links).to have_content('Sound › Interview')
        expect(links).to have_link('Sound', href: /\?f%5Bcho_type_facet.en_ssim%5D%5B%5D=Sound&?/)
        expect(links).to have_link('Interview', href: /\?f%5Bcho_type_facet.en_ssim%5D%5B%5D=Sound%3AInterview&?/)
      end
    end
  end

  describe '#display_date_ranges' do
    it 'is nil if there is no data' do
      expect(helper.display_date_ranges(values: [])).to be_nil
    end

    it 'displays both Gregorian and Hijri data' do
      actual = helper.display_date_ranges(values: [{ gregorian: [1995], hijri: [1415, 1416] }])
      expect(actual).to eq '1995 (Gregorian) / 1415 - 1416 (Hijri)'
    end

    it 'rolls up ranges, but only if they are consecutive' do
      actual = helper.display_date_ranges(values: [{ gregorian: [1994, 1995, 1997], hijri: [1414, 1415, 1416, 1417, 1418] }])
      expect(actual).to eq '1994 - 1995 and 1997 (Gregorian) / 1414 - 1418 (Hijri)'
    end

    it 'still works if there is only hijri data' do
      actual = helper.display_date_ranges(values: [{ hijri: [1415, 1416] }])
      expect(actual).to eq '1415 - 1416 (Hijri)'
    end

    it 'still works if there is only gregorian data' do
      actual = helper.display_date_ranges(values: [{ gregorian: [1995] }])
      expect(actual).to eq '1995 (Gregorian)'
    end

    it 'adds BCE for negative gregorian data' do
      actual = helper.display_date_ranges(values: [{ gregorian: [-87] }])
      expect(actual).to eq '87 BCE (Gregorian)'
    end

    it 'adds BCE for negative hijri data' do
      actual = helper.display_date_ranges(values: [{ hijri: [-87] }])
      expect(actual).to eq '87 BH (Hijri)'
    end

    it 'adds BCE for ranges' do
      actual = helper.display_date_ranges(values: [{ gregorian: [-87, -86, 10], hijri: [-5, -4] }])
      expect(actual).to eq '87 BCE - 86 BCE and 10 (Gregorian) / 5 BH - 4 BH (Hijri)'
    end
  end

  describe '#display_date_sort_context?' do
    let(:blacklight_config) do
      Blacklight::Configuration.new do |config|
        config.add_sort_field 'relevance'
        config.add_sort_field 'date_old_to_new'
        config.add_sort_field 'date_new_to_old'
      end
    end
    let(:search_state) do
      Blacklight::SearchState.new(user_params, blacklight_config, nil)
    end
    let(:session) { {} }

    before do
      allow(helper).to receive(:session).and_return(session)
      allow(helper).to receive(:search_state).and_return(search_state)
    end

    context 'when date_new_to_old sort is applied' do
      let(:user_params) { { sort: 'date_new_to_old' } }

      it 'is true' do
        expect(helper.display_date_sort_context?).to be true
      end
    end

    context 'when date_old_to_new sort is applied' do
      let(:user_params) { { sort: 'date_old_to_new' } }

      it 'is true' do
        expect(helper.display_date_sort_context?).to be true
      end
    end

    context 'without date sort applied' do
      let(:user_params) { { sort: 'relevance' } }

      it 'is false' do
        expect(helper.display_date_sort_context?).to be false
      end
    end

    context 'when context message is turned off via session' do
      let(:session) { { disable_date_sort_context: true } }
      let(:user_params) { { sort: 'date_new_to_old' } }

      it 'is false when date_new_to_old sort is applied' do
        expect(helper.display_date_sort_context?).to be false
      end
    end
  end
end
