# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'statistics/_contributors.html.erb', type: :view do
  before do
    controller.singleton_class.class_eval do
      include Blacklight::Controller
    end

    render partial: 'statistics/contributors', locals: {
      contributors: contributors
    }
  end

  let(:stub_response) do
    { 'facet_counts' => {
      'facet_pivot' => {
        'agg_provider.en_ssim,agg_provider_country.en_ssim' => [
          { 'value' => 'Institution 1', 'count' => '500', 'pivot' => [
            { 'value' => 'Country 1', 'count' => '500' }
          ] },
          { 'value' => 'Institution 2', 'count' => '300', 'pivot' => [
            { 'value' => 'Country 2', 'count' => '300' }
          ] }
        ]
      }
    } }
  end

  let(:contributors) do
    StatisticsDashboard::Contributors.new(stub_response)
  end

  it 'has the total number of contributors in the heading' do
    expect(rendered).to have_css('h2', text: 'Contributors · 2')
  end

  it 'has a table with each institution, the country, and number of items' do
    expect(rendered).to have_css('table tbody tr:nth-child(1) td', text: 'Institution 1')
    expect(rendered).to have_css('table tbody tr:nth-child(1) td', text: 'Country 1')
    expect(rendered).to have_css('table tbody tr:nth-child(1) td', text: '500')

    expect(rendered).to have_css('table tbody tr:nth-child(2) td', text: 'Institution 2')
    expect(rendered).to have_css('table tbody tr:nth-child(2) td', text: 'Country 2')
    expect(rendered).to have_css('table tbody tr:nth-child(2) td', text: '300')
  end

  it 'links to the institution' do
    expect(rendered).to have_link('Institution 1', href: /\?f%5Bagg_provider_en%5D%5B%5D=Institution\+1&/)
    expect(rendered).to have_link('Institution 2', href: /\?f%5Bagg_provider_en%5D%5B%5D=Institution\+2&/)
  end
end
