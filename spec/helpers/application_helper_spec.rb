# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ApplicationHelper, type: :helper do
  before do
    controller.singleton_class.class_eval do
      include Blacklight::Controller
    end
  end

  describe '#link_type_hierarchy' do
    it 'is nil when the data needed to build the hierarchy is not present' do
      expect(helper.link_type_hierarchy({})).to be_nil
      expect(helper.link_type_hierarchy(values: [])).to be_nil
    end

    it 'links a single value' do
      expect(
        helper.link_type_hierarchy(values: ['Sound'], field: 'cho_type_facet')
      ).to have_link('Sound', href: /\?f%5Bcho_type_facet%5D%5B%5D=Sound&/)
    end

    it 'links multiple values (with each value including all preceeding values)' do
      links = helper.link_type_hierarchy(values: ['Sound:Interview'], field: 'cho_type_facet')

      expect(links).to have_content('Sound › Interview')
      expect(links).to have_link('Sound', href: /\?f%5Bcho_type_facet%5D%5B%5D=Sound&/)
      expect(links).to have_link('Interview', href: /\?f%5Bcho_type_facet%5D%5B%5D=Sound%3AInterview&/)
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
  end
end
