# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'statistics/_items.html.erb', type: :view do
  before do
    render partial: 'statistics/items', locals: {
      items: items
    }
  end

  let(:stub_response) do
    { 'facet_counts' => {
      'facet_fields' => {
        'cho_language.en_ssim' => ['Value 1', '500', 'Value 2', '300'],
        'cho_type_facet.en_ssim' => ['Value 1', '500',
                                     'Value 2', '300',
                                     'Value 2:Value A', '200',
                                     'Value 2:Value B', '100']
      }
    } }
  end

  let(:items) do
    StatisticsDashboard::Items.new(stub_response)
  end

  describe 'By type section' do
    it 'has a table with linked type values and their counts' do
      expect(rendered).to have_css('table.by-type')
      expect(rendered).to have_css('table.by-type tr a', text: 'Value 1')
      expect(rendered).to have_css('table.by-type tr a', text: 'Value 2')
      expect(rendered).to have_css('table.by-type tr td', text: '500')
      expect(rendered).to have_css('table.by-type tr td', text: '300')
    end

    it 'includes a first level of type facets (indented)' do
      expect(rendered).to have_css('table.by-type tr td.pl-4 a', text: 'Value A')
      expect(rendered).to have_css('table.by-type tr td.pl-4 a', text: 'Value B')
      expect(rendered).to have_css('table.by-type tr td', text: '200')
      expect(rendered).to have_css('table.by-type tr td', text: '100')
    end
  end

  describe 'By language section' do
    it 'has a table with linked language values and their counts' do
      expect(rendered).to have_css('table.by-language')
      expect(rendered).to have_css('table.by-language tr a', text: 'Value 1')
      expect(rendered).to have_css('table.by-language tr a', text: 'Value 2')
      expect(rendered).to have_css('table.by-language tr td', text: '500')
      expect(rendered).to have_css('table.by-language tr td', text: '300')
    end
  end
end
